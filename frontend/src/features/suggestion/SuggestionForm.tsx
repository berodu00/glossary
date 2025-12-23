import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { Input } from '../../components/ui/Input';
import { suggestionApi } from '../../api/suggestionApi';
import { processApi } from '../../api/processApi';
import type { Process } from '../../types';
import { Loader2 } from 'lucide-react';

export const SuggestionForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [processes, setProcesses] = useState<Process[]>([]);

    const [formData, setFormData] = useState({
        nameKo: '',
        nameEn: '',
        description: '',
        processId: ''
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await suggestionApi.create({
                nameKo: formData.nameKo,
                nameEn: formData.nameEn || undefined,
                description: formData.description,
                processId: formData.processId ? Number(formData.processId) : undefined
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
