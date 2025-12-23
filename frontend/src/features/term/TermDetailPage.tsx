import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { termApi } from '../../api/termApi';
import { AppLayout } from '../layout/AppLayout';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { BookmarkButton } from '../bookmark/BookmarkButton';

export const TermDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const termId = Number(id);

    const { data: term, isLoading, isError } = useQuery({
        queryKey: ['term', termId],
        queryFn: () => termApi.getDetail(termId),
        enabled: !!termId,
    });

    if (isLoading) {
        return (
            <AppLayout>
                <div className="flex h-[50vh] items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            </AppLayout>
        );
    }

    if (isError || !term) {
        return (
            <AppLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">용어를 찾을 수 없습니다.</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="text-primary-600 hover:underline"
                    >
                        메인으로 돌아가기
                    </button>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto px-4 pb-20 animate-fade-in">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    목록으로
                </button>

                {/* Main Content Card */}
                <article className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-4">
                                <Badge variant="process" className="text-sm px-3 py-1">
                                    {term.processName || '공통'}
                                </Badge>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                                        {term.nameKo}
                                    </h1>
                                    {term.nameEn && (
                                        <p className="text-xl text-slate-400 font-mono">
                                            {term.nameEn}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-full transition-all shadow-sm border border-transparent hover:border-slate-200">
                                    <Share2 className="w-5 h-5" />
                                </button>
                                {term && <BookmarkButton termId={term.id} initialBookmarked={false} />}
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-8 md:p-10 space-y-10">
                        {/* Description */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-primary-500 rounded-full mr-3"></span>
                                용어 설명
                            </h3>
                            <p className="text-lg leading-loose text-slate-700 whitespace-pre-line">
                                {term.description}
                            </p>
                        </section>

                        {/* Synonyms */}
                        {term.synonyms && term.synonyms.length > 0 && (
                            <section>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full mr-3"></span>
                                    유의어 (Synonyms)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {term.synonyms.map(syn => (
                                        <span
                                            key={syn.id}
                                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors cursor-context-menu"
                                        >
                                            {syn.synonym}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Images (Placeholder) */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                                <span className="w-1.5 h-6 bg-violet-500 rounded-full mr-3"></span>
                                관련 이미지
                            </h3>
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-64 flex items-center justify-center text-slate-400">
                                등록된 이미지가 없습니다.
                            </div>
                        </section>
                    </div>
                </article>
            </div>
        </AppLayout>
    );
};
