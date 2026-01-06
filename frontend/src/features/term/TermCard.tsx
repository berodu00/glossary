import { Link } from 'react-router-dom';
import type { Term } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { ArrowRight } from 'lucide-react';
import { BookmarkButton } from '../bookmark/BookmarkButton';

interface TermCardProps {
    term: Term;
}

export const TermCard = ({ term }: TermCardProps) => {
    return (
        <div className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Hover Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

            <div className="mb-4 pt-1">
                <div className="flex items-center flex-wrap gap-2">
                    <Link to={`/terms/${term.id}`} className="hover:underline decoration-primary-500 decoration-2 underline-offset-4">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                            {term.nameKo}
                        </h3>
                    </Link>
                    {term.nameEn && (
                        <span className="text-sm font-medium text-slate-400 font-mono pl-1">
                            {term.nameEn}
                        </span>
                    )}
                    <BookmarkButton termId={term.id} />
                </div>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2 min-h-[3rem]">
                {term.description}
            </p>

            {term.photoUrl && (
                <div className="mb-6 rounded-lg overflow-hidden border border-slate-100">
                    <img
                        src={`http://localhost:8080${term.photoUrl}`}
                        alt={term.nameKo}
                        className="w-full h-auto object-cover max-h-48"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            )}

            <div className="flex items-center justify-between mt-auto">
                <Badge variant="process">
                    {term.processes && term.processes.length > 0
                        ? term.processes.map(p => p.name).join(', ')
                        : '공통'}
                </Badge>

                <Link
                    to={`/terms/${term.id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-slate-400 group-hover:text-primary-600 transition-colors"
                >
                    상세보기
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};
