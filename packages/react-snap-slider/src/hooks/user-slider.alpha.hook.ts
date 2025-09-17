import * as React from "react";
import { SliderDirection } from "../types/slider.type";
import { useThrottle } from "./use-throttle.hook";

type UseSliderParams = {
    sliderContainerRef: React.RefObject<HTMLElement | null>;
    containerRef: React.RefObject<HTMLElement | null>;
    cardWidth: number;
    gap: number;
    initialOffset?: number;
    throttleMs?: number;
};

export function useSlider({
    sliderContainerRef,
    containerRef,
    cardWidth,
    gap,
    initialOffset = 0,
    throttleMs = 600,
}: UseSliderParams) {
    const [sliderOffset, setSliderOffset] = React.useState(initialOffset);

    const computeScrollAmount = React.useCallback(
        (n: number, mode: 'item' | 'page' = 'item') =>
            n * (mode === 'page' ? (sliderContainerRef.current?.offsetWidth ?? 0) : cardWidth + gap),
        [cardWidth, gap]
    );

    const moveSlider = React.useCallback(
        (direction: SliderDirection, n = 1, mode: 'item' | 'page' = 'item') => {
            const scrollAmount = computeScrollAmount(n, mode);

            setSliderOffset(prev => {
                if (!containerRef.current || !sliderContainerRef.current) return prev;

                if (direction === SliderDirection.RIGHT) {
                    const maxOffset = Math.max(0, containerRef.current.offsetWidth - sliderContainerRef.current.offsetWidth);
                    return Math.min(maxOffset, prev + scrollAmount);
                } else {
                    return Math.max(0, prev - scrollAmount);
                }
            });
        },
        [computeScrollAmount]
    );

    const throttledMoveSlider = useThrottle(moveSlider, throttleMs);

    const reset = React.useCallback(() => setSliderOffset(0), []);

    return {
        sliderOffset,
        setSliderOffset,
        moveSlider,
        throttledMoveSlider,
        reset,
    };
}