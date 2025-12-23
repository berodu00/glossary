import { Link } from 'react-router-dom';
import { BookMarked, Settings, PlusCircle, ShieldCheck } from 'lucide-react';

export const Header = () => {
    return (
        <header className="relative z-20 sticky top-0 bg-white/70 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-500/30">
                        K
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                        고려아연 용어사전
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-2">
                    <Link
                        to="/suggestion/new"
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors flex items-center gap-1"
                        title="새 용어 제안"
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-semibold">제안하기</span>
                    </Link>

                    <Link
                        to="/admin"
                        className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors flex items-center gap-1"
                        title="관리자 페이지"
                    >
                        <ShieldCheck className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-semibold">관리자</span>
                    </Link>

                    <div className="w-px h-6 bg-slate-200 mx-2" />

                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors">
                        <BookMarked className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="ml-2 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 border-2 border-white shadow-sm">
                        USER
                    </div>
                </nav>
            </div>
        </header>
    );
};
