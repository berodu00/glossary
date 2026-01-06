import { Link } from 'react-router-dom';
import { BookMarked, Settings, PlusCircle, ShieldCheck, UserCircle, LogOut } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="relative z-20 sticky top-0 bg-white/70 backdrop-blur-md border-b border-white/20">
            <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between transition-all duration-300">
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

                    {/* Admin Link - Only visible to ROLE_ADMIN */}
                    {user?.role === 'ROLE_ADMIN' && (
                        <Link
                            to="/admin"
                            className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors flex items-center gap-1"
                            title="관리자 페이지"
                        >
                            <ShieldCheck className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm font-semibold">관리자</span>
                        </Link>
                    )}

                    <div className="w-px h-6 bg-slate-200 mx-2" />

                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors">
                        <BookMarked className="w-5 h-5" />
                    </button>
                    <Link to="/me" className="p-2 text-slate-400 hover:text-primary-600 rounded-full hover:bg-slate-100 transition-colors" title="내 활동">
                        <UserCircle className="w-6 h-6" />
                    </Link>
                    <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-100/50 rounded-full transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex h-8 px-3 bg-slate-100/50 rounded-full items-center justify-center text-xs font-semibold text-primary-600 border border-slate-200 shadow-sm">
                                {user.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER'}
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="로그아웃"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};
