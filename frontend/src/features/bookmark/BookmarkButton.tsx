import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { bookmarkApi } from '../../api/bookmarkApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';

interface BookmarkButtonProps {
    termId: number;
    initialBookmarked?: boolean; // If we load it from list
    className?: string;
}

export const BookmarkButton = ({ termId, initialBookmarked = false, className }: BookmarkButtonProps) => {
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const queryClient = useQueryClient();

    // Setup mutation
    const mutation = useMutation({
        mutationFn: () => bookmarkApi.toggle(termId),
        onSuccess: (data) => {
            setIsBookmarked(data.bookmarked);
            // Invalidate 'myBookmarks' query if we have one
            queryClient.invalidateQueries({ queryKey: ['myBookmarks'] });
        },
        onError: () => {
            // Revert on error
            setIsBookmarked(!isBookmarked);
        }
    });

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation if inside a card
        e.stopPropagation();

        // Optimistic UI update
        setIsBookmarked(!isBookmarked);
        mutation.mutate();
    };

    return (
        <button
            onClick={handleToggle}
            className={clsx(
                "p-2 rounded-full transition-all duration-200",
                isBookmarked
                    ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
                    : "text-slate-300 hover:text-yellow-500 hover:bg-slate-50",
                className
            )}
            aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
        >
            {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 fill-current" />
            ) : (
                <Bookmark className="w-5 h-5" />
            )}
        </button>
    );
};
