import { useSearchParams } from 'react-router-dom';
import { AppLayout } from '../layout/AppLayout';
import { SearchHero } from '../search/SearchHero';
import { FilterPanel } from '../search/FilterPanel';
import { TermList } from '../term/TermList';
// import { useDebounce } from '../../hooks/useDebounce'; // Not needed if we push to URL immediately or debounce inside components. SearchHero updates on enter/click. 
import type { SearchParams } from '../../types';

export const LandingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Parse URL Params
    const keyword = searchParams.get('keyword') || '';
    const initial = searchParams.get('initial') || null;
    const processIds = searchParams.getAll('processIds').map(Number).filter(n => !isNaN(n));
    // Tab state could be internal or URL. Let's keep it simple: existence of processIds implies 'PROCESS' tab? 
    // Or just track it internally for UI toggle. 
    // "frontend_design.md" says: Type Tabs: "기본용어" vs "공정용어" toggle. 
    // Let's deduce tab from params or default to BASIC. 
    // If processIds > 0 => PROCESS tab. Else BASIC? 
    // Or allow manual toggle. Let's use a URL param for tab too? ?type=BASIC|PROCESS
    const type = (searchParams.get('type') as 'BASIC' | 'PROCESS') || 'BASIC';

    const handleSearch = (term: string) => {
        setSearchParams(prev => {
            if (term) {
                prev.set('keyword', term);
            } else {
                prev.delete('keyword');
            }
            prev.delete('page');
            return prev;
        });
    };

    const handleTabChange = (newType: 'BASIC' | 'PROCESS') => {
        setSearchParams(prev => {
            prev.set('type', newType);
            // Clear filters when switching tabs? Design doesn't specify. Let's keep filters or clear?
            // "Initial" might apply to both. "Process" only to Process tab. 
            // Let's clear processIds when switching to BASIC?
            if (newType === 'BASIC') {
                prev.delete('processIds');
            }
            prev.delete('page');
            return prev;
        });
    };

    const handleInitialChange = (char: string | null) => {
        setSearchParams(prev => {
            if (char) {
                prev.set('initial', char);
            } else {
                prev.delete('initial');
            }
            prev.delete('page');
            return prev;
        });
    };

    const handleProcessChange = (ids: number[]) => {
        setSearchParams(prev => {
            prev.delete('processIds');
            ids.forEach(id => prev.append('processIds', String(id)));
            prev.delete('page');
            return prev;
        });
    };

    // Derived Query Params for API
    const apiParams: SearchParams = {
        keyword,
        initial: initial || undefined,
        processIds: processIds.length > 0 ? processIds : undefined,
    };

    return (
        <AppLayout>
            <SearchHero onSearch={handleSearch} />

            <FilterPanel
                activeTab={type}
                onTabChange={handleTabChange}
                selectedInitial={initial}
                onInitialChange={handleInitialChange}
                selectedProcesses={processIds}
                onProcessChange={handleProcessChange}
            />

            <div className="mt-8">
                <TermList searchParams={apiParams} />
            </div>
        </AppLayout>
    );
};
