import { useState, useEffect } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { suggestionApi } from '../../api/suggestionApi';
import type { Suggestion } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Check, X, Loader2 } from 'lucide-react';

export const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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

    const handleApprove = async (id: number) => {
        // Confirm removed for easier testing and faster admin workflow
        try {
            await suggestionApi.approve(id);
            alert('승인되었습니다.');
            loadSuggestions(); // Reload list
        } catch (error) {
            console.error(error);
            alert('승인 중 오류가 발생했습니다.');
        }
    };

    const handleReject = async (id: number) => {
        const reason = prompt('반려 사유를 입력해주세요:');
        if (reason === null) return; // Cancelled

        try {
            await suggestionApi.reject(id, reason);
            alert('반려되었습니다.');
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
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">관리</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {suggestions.map((suggestion) => (
                                        <tr key={suggestion.id} className="hover:bg-slate-50/50 transition-colors">
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
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleApprove(suggestion.id)}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-200"
                                                        title="승인"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(suggestion.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                                                        title="반려"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
