import { Badge } from '../../components/ui/Badge';
import { clsx } from 'clsx';
import { Filter, Check } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { processApi } from '../../api/processApi';

interface FilterPanelProps {
    activeTab: 'BASIC' | 'PROCESS';
    onTabChange: (tab: 'BASIC' | 'PROCESS') => void;
    selectedInitial: string | null;
    onInitialChange: (initial: string | null) => void;
    selectedProcesses: number[];
    onProcessChange: (processes: number[]) => void;
}

export const FilterPanel = ({
    activeTab,
    onTabChange,
    selectedInitial,
    onInitialChange,
    selectedProcesses,
    onProcessChange
}: FilterPanelProps) => {
    const initialsKo = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const initialsEn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Fetch dynamic processes
    const { data: processes = [] } = useQuery({
        queryKey: ['processes'],
        queryFn: processApi.getAll,
        staleTime: 600000,
    });

    // Helper to determine if a process is visually selected
    // Helper to determine if a process is visually selected
    const isProcessSelected = (processId: number) => {
        if (selectedProcesses.includes(-1)) return false; // Explicitly None
        if (selectedProcesses.length === 0) return true; // Empty means All
        return selectedProcesses.includes(processId);
    };

    const isAllSelected = selectedProcesses.length === 0 && !selectedProcesses.includes(-1);

    const toggleProcess = (processId: number) => {
        // Remove -1 if present
        const currentSelection = selectedProcesses.filter(id => id !== -1);

        if (currentSelection.length === 0) {
            // currently "All". Clicking one selects ONLY that one.
            onProcessChange([processId]);
        } else {
            if (currentSelection.includes(processId)) {
                const newSelection = currentSelection.filter(p => p !== processId);
                // If last one deselected, revert to All (Empty)
                if (newSelection.length === 0) {
                    onProcessChange([]);
                } else {
                    onProcessChange(newSelection);
                }
            } else {
                onProcessChange([...currentSelection, processId]);
            }
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            // If All selected, clicking means Deselect All (None)
            onProcessChange([-1]);
        } else {
            // Any other state -> Select All
            onProcessChange([]);
        }
    };

    return (
        <section className="w-full relative z-10 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Tab Header (Pill Style) */}
                <div className="bg-slate-50 p-1.5 flex items-center justify-center gap-1 border-b border-slate-100">
                    {/* Image shows a wide toggle bar across the top or centered? Usually centered or full width. 
                         The image shows a "Basic" on left, "Process" on right, background gray. 
                         Let's assume full width toggle. */}
                    <button
                        onClick={() => onTabChange('BASIC')}
                        className={clsx(
                            "flex-1 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-200",
                            activeTab === 'BASIC'
                                ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        기본용어
                    </button>
                    <button
                        onClick={() => onTabChange('PROCESS')}
                        className={clsx(
                            "flex-1 py-3 text-sm md:text-base font-bold rounded-xl transition-all duration-200",
                            activeTab === 'PROCESS'
                                ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        공정용어
                    </button>
                </div>

                {/* Filter Body */}
                <div className="p-4 md:p-6 space-y-4">

                    {/* Initials Filter */}
                    <div className="space-y-2">
                        {/* Korean Initials */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white p-2 rounded-lg border border-slate-100">
                            <div className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-blue-500 min-w-[3.5rem] pl-1">
                                국문순
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {initialsKo.map(char => (
                                    <button
                                        key={char}
                                        onClick={() => onInitialChange(selectedInitial === char ? null : char)}
                                        className={clsx(
                                            "w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 border",
                                            selectedInitial === char
                                                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                                : "bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:border-slate-200"
                                        )}
                                    >
                                        {char}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* English Initials */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white p-2 rounded-lg border border-slate-100">
                            <div className="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-blue-500 min-w-[3.5rem] pl-1">
                                영문순
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {initialsEn.map(char => (
                                    <button
                                        key={char}
                                        onClick={() => onInitialChange(selectedInitial === char ? null : char)}
                                        className={clsx(
                                            "w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-200 border",
                                            selectedInitial === char
                                                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                                : "bg-white text-slate-500 border-transparent hover:bg-slate-50 hover:border-slate-200"
                                        )}
                                    >
                                        {char}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Process Filter - Chip Grid Style */}
                    {activeTab === 'PROCESS' && (
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fade-in">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                {/* Select All Button */}
                                <button
                                    onClick={handleSelectAll}
                                    className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-slate-200 hover:border-slate-300 transition-colors shadow-sm text-left group"
                                >
                                    <div className={clsx(
                                        "w-4 h-4 border rounded flex items-center justify-center transition-colors flex-shrink-0",
                                        isAllSelected ? "bg-transparent border-slate-800" : "border-slate-300 bg-transparent group-hover:border-slate-400"
                                    )}>
                                        {isAllSelected && <Check className="w-3 h-3 text-slate-800" strokeWidth={3} />}
                                    </div>
                                    <span className={clsx("text-xs font-semibold truncate", isAllSelected ? "text-slate-800" : "text-slate-600")}>
                                        전체선택
                                    </span>
                                </button>

                                {processes.map(process => {
                                    const isSelected = isProcessSelected(process.id);
                                    const displayName = process.name.replace(/\s*\(.*?\)\s*/g, '');

                                    return (
                                        <button
                                            key={process.id}
                                            onClick={() => toggleProcess(process.id)}
                                            className="flex items-center gap-2 px-3 py-2 bg-white rounded border border-slate-200 hover:border-slate-300 transition-colors shadow-sm text-left group"
                                        >
                                            <div className={clsx(
                                                "w-4 h-4 border rounded flex items-center justify-center transition-colors flex-shrink-0",
                                                isSelected ? "bg-transparent border-slate-800" : "border-slate-300 bg-transparent group-hover:border-slate-400"
                                            )}>
                                                {isSelected && <Check className="w-3 h-3 text-slate-800" strokeWidth={3} />}
                                            </div>
                                            <span className={clsx("text-xs font-medium truncate", isSelected ? "text-slate-800" : "text-slate-600")}>
                                                {displayName}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};
