import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { termApi } from '../../api/termApi';
import { TermCard } from './TermCard';
import { Loader2 } from 'lucide-react';
import type { SearchParams } from '../../types';

interface TermListProps {
    searchParams: SearchParams;
}

export const TermList = ({ searchParams }: TermListProps) => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [searchParams.keyword, searchParams.initial, searchParams.processIds]);

    // React Query
    const { data: termsData, isLoading, isError } = useQuery({
        queryKey: ['terms', searchParams.keyword, searchParams.initial, searchParams.processIds, page],
        queryFn: () => termApi.search({ ...searchParams, page: page - 1, size: pageSize }),
        staleTime: 5000,
    });

    return (
        <section className="w-full animate-fade-in relative z-0">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-primary-500">
                <h2 className="text-lg font-bold text-slate-800">
                    {termsData?.totalElements ? (
                        <>총 <span className="text-primary-600 font-bold">{termsData.totalElements}</span>건</>
                    ) : (
                        '검색 결과'
                    )}
                </h2>
            </div>

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary-500" />
                    <p>용어 목록을 불러오는 중입니다...</p>
                </div>
            )}

            {isError && (
                <div className="text-center py-20 text-red-500 bg-red-50 rounded-xl border border-red-100">
                    <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-sm font-semibold underline">
                        다시 시도하기
                    </button>
                </div>
            )}

            {!isLoading && !isError && (!termsData?.content || termsData.content.length === 0) && (
                <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <p>검색 결과가 없습니다.</p>
                    {searchParams.keyword && <p className="mt-2 text-sm">"{searchParams.keyword}"에 대한 결과를 찾을 수 없습니다.</p>}
                </div>
            )}

            {!isLoading && !isError && termsData?.content && (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {termsData.content.map((term) => (
                            <TermCard key={term.id} term={term} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {termsData.totalPages > 1 && (
                        <div className="flex justify-center mt-12 gap-2 flex-wrap">
                            {Array.from({ length: termsData.totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setPage(i + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`w-10 h-10 rounded-full font-bold transition-all ${page === i + 1
                                            ? 'bg-blue-500 text-white shadow-lg scale-110'
                                            : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-blue-500'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};
