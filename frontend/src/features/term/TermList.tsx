import { useQuery } from '@tanstack/react-query';
import { termApi } from '../../api/termApi';
import { TermCard } from './TermCard';
import type { SearchParams } from '../../types';
import { Loader2 } from 'lucide-react';

interface TermListProps {
    searchParams: SearchParams;
}

export const TermList = ({ searchParams }: TermListProps) => {
    // React Query will automatically refetch when searchParams change (because it's in the queryKey)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['terms', searchParams],
        queryFn: () => termApi.search(searchParams),
        staleTime: 5000,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 animate-fade-in">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary-500" />
                <p>용어 목록을 불러오는 중입니다...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-xl border border-red-100">
                <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-sm font-semibold underline">
                    다시 시도하기
                </button>
            </div>
        );
    }

    if (!data?.content || data.content.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                <p>검색 결과가 없습니다.</p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">
                    총 <span className="text-primary-600">{data.totalElements}</span>건의 용어가 있습니다
                </h2>
                {/* Pagination Controls could go here */}
            </div>

            <div className="grid grid-cols-1 gap-6">
                {data.content.map((term) => (
                    <TermCard key={term.id} term={term} />
                ))}
            </div>
        </section>
    );
};
