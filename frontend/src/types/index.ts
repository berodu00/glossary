export interface Term {
    id: number;
    name: string;
    description: string;
    englishName?: string;
    processId?: number;
    processName?: string;
    createdAt: string;
    updatedAt: string;
    // Synonyms will be added in M6/M7 if needed here, usually in detail
}

export interface TermDetail extends Term {
    synonyms: TermSynonym[];
    images?: string[]; // placeholder for now
}

export interface TermSynonym {
    id: number;
    synonym: string;
}

export interface Process {
    id: number;
    name: string;
    displayOrder: number;
}

export interface Page<T> {
    items: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    last: boolean;
}

export interface SearchParams {
    keyword?: string;
    processId?: number;
    initial?: string;
    page?: number;
    size?: number;
}
