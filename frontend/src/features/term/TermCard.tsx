import { Link } from 'react-router-dom';
import type { Term } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { BookMarked, ArrowRight } from 'lucide-react';

interface TermCardProps {
    term: Term;
}

export const TermCard = ({ term }: TermCardProps) => {
    return (
        <div className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
            {/* Hover Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

            <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Link to={`/terms/${term.id}`} className="hover:underline decoration-primary-500 decoration-2 underline-offset-4">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                                {term.nameKo}
                            </h3>
                        </Link>
                        {term.nameEn && (
                            <span className="text-sm font-medium text-slate-400 font-mono">
                                {term.nameEn}
                            </span>
                        )}
                    </div>
                </div>
                <button className="text-slate-300 hover:text-primary-500 transition-colors p-1 rounded-full hover:bg-slate-50">
                    <BookMarked className="w-5 h-5" />
                </button>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2 min-h-[3rem]">
                {term.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
                <Badge variant="process">
                    {term.processName || '공통'}
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
