import { useQuery } from '@tanstack/react-query';
import { termApi } from '../../api/termApi';
import { TermCard } from './TermCard';
import { Loader2 } from 'lucide-react';
import type { SearchParams } from '../../types';

interface TermListProps {
    searchParams: SearchParams;
}

export const TermList = ({ searchParams }: TermListProps) => {
    // React Query
    const { data: termsData, isLoading, isError } = useQuery({
        queryKey: ['terms', searchParams.keyword, searchParams.initial, searchParams.processIds],
        queryFn: () => termApi.search(searchParams),
        staleTime: 5000,
    });

    return (
        <section className="max-w-7xl mx-auto px-4 py-8 animate-fade-in relative z-0">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">
                    {termsData?.totalElements ? (
                        <>총 <span className="text-primary-600">{termsData.totalElements}</span>건의 용어가 있습니다</>
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
                <div className="grid grid-cols-1 gap-6">
                    {termsData.content.map((term) => (
                        <TermCard key={term.id} term={term} />
                    ))}
                </div>
            )}
        </section>
    );
};
