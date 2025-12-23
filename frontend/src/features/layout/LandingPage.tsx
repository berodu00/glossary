import { useState } from 'react';
import { AppLayout } from '../layout/AppLayout';
import { SearchHero } from '../search/SearchHero';
import { FilterPanel } from '../search/FilterPanel';
import { TermList } from '../term/TermList';
import { useDebounce } from '../../hooks/useDebounce';
import type { SearchParams } from '../../types';

export const LandingPage = () => {
    // Search State
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedKeyword = useDebounce(searchTerm, 500);

    // Filter State
    const [activeTab, setActiveTab] = useState<'BASIC' | 'PROCESS'>('BASIC');
    const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
    const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);

    // Construct Query Params
    const searchParams: SearchParams = {
        keyword: debouncedKeyword,
        size: 20,
        initial: activeTab === 'BASIC' ? (selectedInitial || undefined) : undefined,
        // For Process tab, we might handle differently in real implementation
    };

    return (
        <AppLayout>
            <SearchHero onSearch={setSearchTerm} />

            <FilterPanel
                activeTab={activeTab}
                onTabChange={setActiveTab}
                selectedInitial={selectedInitial}
                onInitialChange={setSelectedInitial}
                selectedProcesses={selectedProcesses}
                onProcessChange={setSelectedProcesses}
            />

            <div className="mt-8">
                <TermList searchParams={searchParams} />
            </div>
        </AppLayout>
    );
};
