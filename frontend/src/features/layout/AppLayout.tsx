import { ReactNode } from 'react';
import { Header } from './Header';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent opacity-60" />
            </div>

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative z-10 max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
                {children}
            </main>
        </div>
    );
};
