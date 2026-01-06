import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { suggestionApi } from '../../api/suggestionApi';
import type { Suggestion } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Check, X, Loader2 } from 'lucide-react';

export const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

    const loadSuggestions = async () => {
        setIsLoading(true);
        try {
            const data = await suggestionApi.getPending();
            setSuggestions(data);
        } catch (error) {
            console.error('Failed to load suggestions', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSuggestions();
    }, []);

    const handleApprove = async () => {
        if (!selectedSuggestion) return;
        try {
            await suggestionApi.approve(selectedSuggestion.id);
            alert('승인되었습니다.');
            setSelectedSuggestion(null);
            loadSuggestions(); // Reload list
        } catch (error) {
            console.error(error);
            alert('승인 중 오류가 발생했습니다.');
        }
    };

    const handleReject = async () => {
        if (!selectedSuggestion) return;
        const reason = prompt('반려 사유를 입력해주세요:');
        if (reason === null) return; // Cancelled

        try {
            await suggestionApi.reject(selectedSuggestion.id, reason);
            alert('반려되었습니다.');
            setSelectedSuggestion(null);
            loadSuggestions(); // Reload list
        } catch (error) {
            console.error(error);
            alert('반려 중 오류가 발생했습니다.');
        }
    };

    return (
        <AppLayout>
            <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800">관리자 대시보드</h1>
                    <span className="bg-primary-100 text-primary-700 font-bold px-3 py-1 rounded-full text-sm">
                        대기 중인 제안: {suggestions.length}건
                    </span>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                    {isLoading ? (
                        <div className="p-20 text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-500 mx-auto" />
                        </div>
                    ) : suggestions.length === 0 ? (
                        <div className="p-20 text-center text-slate-400">
                            처리할 대기 중인 제안이 없습니다.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">공정</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">용어명</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">설명</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600">요청자</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">상세</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {suggestions.map((suggestion) => (
                                        <tr
                                            key={suggestion.id}
                                            className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                                            onClick={() => setSelectedSuggestion(suggestion)}
                                        >
                                            <td className="px-6 py-4">
                                                <Badge variant="process">
                                                    {suggestion.processName || '공통'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{suggestion.nameKo}</div>
                                                {suggestion.nameEn && (
                                                    <div className="text-sm text-slate-400 font-mono">{suggestion.nameEn}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={suggestion.description}>
                                                {suggestion.description}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                                                {suggestion.requesterId}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-blue-500 font-medium">
                                                클릭하여 상세 보기
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Suggestion Detail Modal */}
            <Modal
                isOpen={!!selectedSuggestion}
                onClose={() => setSelectedSuggestion(null)}
                title="제안 상세 정보"
            >
                {selectedSuggestion && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
                            <div className="text-sm text-slate-500 flex items-center gap-2">
                                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">{selectedSuggestion.requesterId}</span>
                                <span>님이 제안함</span>
                                <span className="text-slate-300">•</span>
                                <span>{new Date(selectedSuggestion.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Core Data */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">한글 용어명</label>
                                <div className="text-lg font-bold text-slate-900">{selectedSuggestion.nameKo}</div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">영문 용어명</label>
                                <div className="text-lg font-medium text-slate-700 font-mono">{selectedSuggestion.nameEn || '-'}</div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">관련 공정</label>
                                <div><Badge variant="process">{selectedSuggestion.processName || '공통'}</Badge></div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">용어 설명</label>
                            <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed border border-slate-100">
                                {selectedSuggestion.description}
                            </div>
                        </div>

                        {/* Image Preview (If any) */}
                        {selectedSuggestion.imageUrl && (
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">첨부 이미지</label>
                                <img src={selectedSuggestion.imageUrl} alt="Reference" className="rounded-lg border border-slate-200 max-h-60 object-contain bg-slate-50" />
                            </div>
                        )}

                        {/* Actions Footer */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-8">
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg font-bold transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                반려
                            </button>
                            <button
                                onClick={handleApprove}
                                className="px-6 py-2 text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg font-bold transition-colors shadow-sm shadow-emerald-200 flex items-center gap-2"
                            >
                                <Check className="w-4 h-4" />
                                승인
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </AppLayout>
    );
};
