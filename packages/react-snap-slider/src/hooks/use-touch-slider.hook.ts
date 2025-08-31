import { useCallback, useRef } from "react";
// import { throttle } from "../utils/helper.util";
import { SliderDirection } from "../types/slider.type";

export function useTouchSlider({ onSwipe }: { onSwipe?: (direction: SliderDirection) => void }): {
    handleTouchStart: React.TouchEventHandler<HTMLElement>;
    handleTouchEnd: React.TouchEventHandler<HTMLElement>;
} {
    const touchStartX = useRef(0);
    const threshold = 40;

    const handleTouchStart = useCallback(((e: React.TouchEvent<HTMLElement>) => {
        touchStartX.current = e.touches[0].clientX;
    }), []);

    const handleTouchEnd = useCallback(((e: React.TouchEvent<HTMLElement>) => {
        const endX = e.changedTouches[0].clientX;

        const diffX = endX - touchStartX.current;

        if (Math.abs(diffX) > threshold) {
            onSwipe?.(diffX > 0 ? SliderDirection.LEFT : SliderDirection.RIGHT);
        }
    }), [onSwipe]);

    return { handleTouchStart, handleTouchEnd };
}