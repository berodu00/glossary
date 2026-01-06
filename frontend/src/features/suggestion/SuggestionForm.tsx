import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { Input } from '../../components/ui/Input';
import { suggestionApi } from '../../api/suggestionApi';
import { processApi } from '../../api/processApi';
import type { Process } from '../../types';
import { fileApi } from '../../api/fileApi';
import { Loader2 } from 'lucide-react';

export const SuggestionForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [processes, setProcesses] = useState<Process[]>([]);

    const [formData, setFormData] = useState({
        nameKo: '',
        nameEn: '',
        description: '',
        processId: '',
        imageUrl: ''
    });

    useEffect(() => {
        const loadProcesses = async () => {
            try {
                const data = await processApi.getAll();
                setProcesses(data);
            } catch (error) {
                console.error('Failed to load processes', error);
            }
        };
        loadProcesses();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const { url } = await fileApi.upload(file);
            setFormData(prev => ({ ...prev, imageUrl: url }));
        } catch (error) {
            console.error('File upload failed', error);
            alert('이미지 업로드에 실패했습니다.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await suggestionApi.create({
                nameKo: formData.nameKo,
                nameEn: formData.nameEn || undefined,
                description: formData.description,
                processId: formData.processId ? Number(formData.processId) : undefined,
                imageUrl: formData.imageUrl || undefined
            });
            alert('용어 제안이 등록되었습니다.');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto px-4 py-10 animate-fade-in">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">신규 용어 제안</h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-6">
                    {/* Name KO */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            용어명 (한글) <span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={formData.nameKo}
                            onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                            placeholder="예: 전해채취"
                            required
                        />
                    </div>

                    {/* Name EN */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            용어명 (영문)
                        </label>
                        <Input
                            value={formData.nameEn}
                            onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                            placeholder="예: Electrowinning"
                        />
                    </div>

                    {/* Process Select */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            관련 공정
                        </label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-slate-700 transition-all"
                            value={formData.processId}
                            onChange={(e) => setFormData({ ...formData, processId: e.target.value })}
                        >
                            <option value="">공정 선택 안함 (공통)</option>
                            {processes.map(process => (
                                <option key={process.id} value={process.id}>
                                    {process.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            이미지 첨부
                        </label>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                                <label className={`cursor-pointer bg-white border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 transition-colors flex items-center gap-2 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    <span className="text-sm font-medium text-slate-600">파일 선택</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isUploading}
                                    />
                                </label>
                                {isUploading && (
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>업로드 중...</span>
                                    </div>
                                )}
                            </div>

                            {formData.imageUrl && (
                                <div className="mt-2 w-full max-w-xs h-40 rounded-lg border border-slate-200 overflow-hidden relative group">
                                    <img
                                        src={`http://localhost:8080${formData.imageUrl}`}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            상세 설명 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full h-40 px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-slate-700 transition-all"
                            placeholder="용어에 대한 상세한 설명을 입력해주세요."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : null}
                        {isLoading ? '저장 중...' : '제안 등록하기'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
};
