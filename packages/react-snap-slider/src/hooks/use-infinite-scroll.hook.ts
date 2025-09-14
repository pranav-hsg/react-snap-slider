import { useEffect, useRef, useCallback, useState } from 'react';


interface UseInfiniteScrollOptions {
    totalSlides: number;
    visibleSlidesCount: number;
    slidesToScroll: number;
    scrollStart?: number;
}
export function useInfiniteScroll({
    totalSlides,
    visibleSlidesCount,
    slidesToScroll,
    scrollStart,
}: UseInfiniteScrollOptions) {
    const [postCloneCount, setPostCloneCount] = useState<number>(null);
    const [preCloneCount, setPreCloneCount] = useState<number>(null);
    const [remainingSlots, setRemainingSlots] = useState<number>(null);

    // We’re trying to fit steps of size o inside the remaining space (m - n).
    // Where:
    // m = total cards
    // n = cards per view
    // o = cards per scroll
    function findRemaining(totalSlides: number, visibleCards: number, slidesToScroll: number): number {
        // Modular Arithmetic + Discrete Partitioning
        // m - n = remaining space
        // m - n / o = number of scrolls till we run out of cards
        const remainingSpaceToScroll = totalSlides - visibleCards;
        const remainingSlidesAtLastScroll = remainingSpaceToScroll % slidesToScroll;
        const remainingSlotsAtLastScroll = slidesToScroll - remainingSlidesAtLastScroll;
        return remainingSlotsAtLastScroll;
    }
    function getSmartFitSlideSize(remainingSlots: number, slidesToScroll: number, visibleSlidesCount: number): number {
        if (remainingSlots >= visibleSlidesCount) return 0;
        return remainingSlots + ((slidesToScroll) * Math.ceil((visibleSlidesCount - remainingSlots) / slidesToScroll));
    }
    function computeBoundedStepValue(offset: number, step: number, limit: number): number | null {
        console.log({ offset, step, limit });
        return offset <= limit ? offset : Math.floor((limit) / step) * step;
    }

    useEffect(() => {
        const remainingPostSlots = findRemaining(totalSlides, visibleSlidesCount, slidesToScroll);
        setPreCloneCount(computeBoundedStepValue(getSmartFitSlideSize(slidesToScroll, slidesToScroll, visibleSlidesCount), slidesToScroll, totalSlides));
        setPostCloneCount(computeBoundedStepValue(getSmartFitSlideSize(remainingPostSlots, slidesToScroll, visibleSlidesCount) - remainingSlots, slidesToScroll, totalSlides) + remainingSlots);
    }, [totalSlides,
        slidesToScroll,
        visibleSlidesCount]);

    return { postCloneCount, remainingSlots, preCloneCount };
}