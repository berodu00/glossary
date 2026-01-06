import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useState } from 'react';

interface SearchHeroProps {
    onSearch: (keyword: string) => void;
}

export const SearchHero = ({ onSearch }: SearchHeroProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTrigger = () => {
        onSearch(searchTerm);
    };

    const handleSuggestionClick = (term: string) => {
        setSearchTerm(term);
        onSearch(term);
    };

    const suggestions = ['SMF', '전해제련', '규산만들기', '백필터망 키우기', '반도체 황산'];

    return (
        <section className="py-16 md:py-24 flex flex-col items-center justify-center text-center px-4 animate-fade-in relative z-10">
            <h2 className="text-sm md:text-base font-bold text-slate-800 mb-3 tracking-wide">
                인터넷에서는 찾을 수 없지만 이 용어집에서는 찾을 수 있다!
            </h2>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-10 drop-shadow-sm leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400">
                    KZ 공정용어, 어디까지 알고 있나요?
                </span>
            </h1>

            {/* Search Bar Container */}
            <div className="w-full max-w-2xl text-left">
                <div className="relative group">
                    {/* Gradient Border Background */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-full blur-[1px] opacity-70 group-hover:opacity-100 transition duration-200"></div>

                    <div className="relative bg-white rounded-full flex items-center p-1.5 h-14 md:h-16">
                        {/* Logo / Left Icon Section */}
                        <div className="pl-4 pr-3 flex-shrink-0">
                            <div className="w-8 h-8 relative flex items-center justify-center">
                                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="white" />
                                    <path d="M7 12L12 7L17 12H7Z" fill="#3B82F6" />
                                    <path d="M12 12L7 17L7 12H12Z" fill="#22C55E" />
                                    <path d="M12 12L17 17L12 17V12Z" fill="#F59E0B" />
                                    <path d="M4 12C4 7.58 7.58 4 12 4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 20C7.58 20 4 16.42 4 12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M20 12C20 16.42 16.42 20 12 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="찾고자하는 용어를 검색해보세요."
                            className="flex-1 h-full bg-transparent outline-none text-slate-700 text-lg placeholder-slate-400 border-none focus:ring-0 px-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                        />

                        {/* Search Icon (Right, Internal) */}
                        <button
                            onClick={handleSearchTrigger}
                            className="p-3 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-2xl">
                {suggestions.map((suggestion) => (
                    <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-white hover:shadow-sm px-4 py-1.5 text-sm bg-white/50 backdrop-blur-sm border border-slate-200"
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </Badge>
                ))}
            </div>
        </section>
    );
};
