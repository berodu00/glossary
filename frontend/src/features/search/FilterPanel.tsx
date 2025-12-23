import { Badge } from '../../components/ui/Badge';
import { clsx } from 'clsx';
import { Filter, Check } from 'lucide-react';

interface FilterPanelProps {
    activeTab: 'BASIC' | 'PROCESS';
    onTabChange: (tab: 'BASIC' | 'PROCESS') => void;
    selectedInitial: string | null;
    onInitialChange: (initial: string | null) => void;
    selectedProcesses: string[];
    onProcessChange: (processes: string[]) => void;
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

    // Mock Processes (will be replaced by API in Step 4)
    const processes = [
        '배소', '조액', '정액', '전해', '주조', '동제련', '전자소재',
        '제련', '정련', '귀금속', 'Fumer', '정수', '열병합', '수처리', 'LNG 복합화력',
        '산소공장', 'Air-Compressor'
    ];

    const toggleProcess = (process: string) => {
        if (selectedProcesses.includes(process)) {
            onProcessChange(selectedProcesses.filter(p => p !== process));
        } else {
            onProcessChange([...selectedProcesses, process]);
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 animate-slide-up">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Tab Header */}
                <div className="flex border-b border-slate-100">
                    <button
                        onClick={() => onTabChange('BASIC')}
                        className={clsx(
                            "flex-1 py-4 text-center font-medium transition-colors",
                            activeTab === 'BASIC' ? "text-primary-600 bg-primary-50/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        )}
                    >
                        기본용어
                    </button>
                    <button
                        onClick={() => onTabChange('PROCESS')}
                        className={clsx(
                            "flex-1 py-4 text-center font-medium transition-colors border-l border-slate-100",
                            activeTab === 'PROCESS' ? "text-primary-600 bg-primary-50/50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                        )}
                    >
                        공정용어
                    </button>
                </div>

                {/* Filter Body */}
                <div className="p-6 md:p-8 space-y-8">

                    {/* Initials Filter */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                            <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                            국문순
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {initialsKo.map(char => (
                                <button
                                    key={char}
                                    onClick={() => onInitialChange(selectedInitial === char ? null : char)}
                                    className={clsx(
                                        "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200",
                                        selectedInitial === char
                                            ? "bg-primary-600 text-white shadow-md shadow-primary-200 transform scale-105"
                                            : "bg-slate-50 text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
                                    )}
                                >
                                    {char}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mt-6">
                            <span className="w-1 h-4 bg-primary-500 rounded-full"></span>
                            영문순
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {initialsEn.map(char => (
                                <button
                                    key={char}
                                    onClick={() => onInitialChange(selectedInitial === char ? null : char)}
                                    className={clsx(
                                        "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200",
                                        selectedInitial === char
                                            ? "bg-primary-600 text-white shadow-md shadow-primary-200 transform scale-105"
                                            : "bg-slate-50 text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200"
                                    )}
                                >
                                    {char}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Process Filter */}
                    <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                <Filter className="w-4 h-4 text-primary-500" />
                                공정별 필터
                            </div>
                            <button
                                onClick={() => onProcessChange([])}
                                className="text-xs text-slate-400 hover:text-primary-600 underline"
                            >
                                초기화
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {processes.map(process => {
                                const isSelected = selectedProcesses.includes(process);
                                return (
                                    <button
                                        key={process}
                                        onClick={() => toggleProcess(process)}
                                        className={clsx(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all duration-200 border",
                                            isSelected
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                            isSelected ? "bg-emerald-500 border-transparent" : "border-slate-300 bg-white"
                                        )}>
                                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                        </div>
                                        <span className="truncate">{process}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
