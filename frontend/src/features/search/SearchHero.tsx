import { Search } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useState } from 'react';

interface SearchHeroProps {
    onSearch: (keyword: string) => void;
}

export const SearchHero = ({ onSearch }: SearchHeroProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        onSearch(term);
    };

    const suggestions = ['SMF', '전해제련', '규산만들기', '백필터망 키우기', '반도체 황산'];

    return (
        <section className="py-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
            <h2 className="text-xl md:text-2xl font-medium text-slate-500 mb-2">
                단어사전에서는 모를 수 있지만 이 분야에서는 모를 수 없다
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-10 drop-shadow-sm">
                KZ 공정과 용어, 어디까지 알고 있나요?
            </h1>

            {/* Search Bar Container */}
            <div className="w-full max-w-2xl relative group">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                    <Input
                        placeholder="찾고시는 용어를 검색해보세요."
                        className="pl-12 h-14 text-lg shadow-lg border-blue-100 hover:border-blue-300 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-2xl">
                {suggestions.map((suggestion) => (
                    <Badge
                        key={suggestion}
                        variant="secondary"
                        className="cursor-pointer hover:bg-white hover:shadow-sm px-4 py-1.5 text-sm bg-white/50 backdrop-blur-sm border border-slate-200"
                        onClick={() => handleSearch(suggestion)}
                    >
                        {suggestion}
                    </Badge>
                ))}
            </div>
        </section>
    );
};
