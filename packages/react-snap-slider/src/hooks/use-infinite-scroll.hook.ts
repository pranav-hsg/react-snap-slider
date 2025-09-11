import { num } from './../../../../node_modules/mlly/dist/index.d';
import { useEffect, useRef, useCallback, useState } from 'react';


interface UseInfiniteScrollOptions {
    totalSlides: number;
    visibleSlidesCount: number;
    slidesToScroll: number;
}
export function useInfiniteScroll({
    totalSlides,
    visibleSlidesCount,
    slidesToScroll,
}: UseInfiniteScrollOptions) {
    const [postCloneCount, setPostCloneCount] = useState<number>(null);
    const [preCloneCount, setPreCloneCount] = useState<number>(null);

    // We’re trying to fit steps of size o inside the remaining space (m - n).
    // Where:
    // m = total cards
    // n = cards per view
    // o = cards per scroll
    function findRemaining(totalSlides: number, visibleCards: number, slidesToScroll: number): number {
        // Modular Arithmetic + Discrete Partitioning
        // m - n = remaining space
        // m - n / o = number of scrolls till we run out of cards
        const remainingSpace = totalSlides - visibleCards;
        const remainingSlides = remainingSpace % slidesToScroll;
        const remainingSlots = slidesToScroll - remainingSlides;
        return remainingSlots;
    }
    function getSmartFitSlideSize(remainingSlots: number, slidesToScroll: number, visibleSlidesCount: number): number {
        if (remainingSlots >= visibleSlidesCount) return 0;
        return remainingSlots + ((slidesToScroll) * Math.ceil((visibleSlidesCount - remainingSlots) / slidesToScroll));
    }
    useEffect(() => {
        const remainingSlots = findRemaining(totalSlides, visibleSlidesCount, slidesToScroll);
        setPostCloneCount(getSmartFitSlideSize(remainingSlots, slidesToScroll, visibleSlidesCount));
    }, [totalSlides,
        slidesToScroll,
        visibleSlidesCount]);

    return { postCloneCount };
}