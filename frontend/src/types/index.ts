export interface Term {
    id: number;
    nameKo: string;
    description: string;
    nameEn?: string;
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
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    last: boolean;
}

export interface SearchParams {
    keyword?: string;
    processId?: number;
    processIds?: number[];
    initial?: string;
    page?: number;
    size?: number;
}

// Milestone 6: Suggestions
export type SuggestionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Suggestion {
    id: number;
    requesterId: string;
    nameKo: string;
    nameEn?: string;
    description: string;
    processId?: number;
    processName?: string;
    status: SuggestionStatus;
    createdAt: string;
    reviewedAt?: string;
    reviewerNote?: string;
}

export interface CreateSuggestionRequest {
    nameKo: string;
    nameEn?: string;
    description: string;
    processId?: number;
}
