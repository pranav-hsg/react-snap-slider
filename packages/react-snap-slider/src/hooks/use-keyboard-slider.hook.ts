import * as React from "react";
import { SliderDirection } from "../types/slider.type";
import { useThrottle } from "./use-throttle.hook";

export function useKeyboardSlider({ onKeyup }: { onKeyup: (direction: SliderDirection) => void }): {
    handleKeyPress: React.KeyboardEventHandler<HTMLElement>;
} {
    const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'ArrowLeft') {
            onKeyup(SliderDirection.LEFT);
        } else if (e.key === 'ArrowRight') {
            onKeyup(SliderDirection.RIGHT);
        }
    }
    const handleKeyPress = useThrottle(onKeyPress);

    return { handleKeyPress };

}