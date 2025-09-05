import { throttle } from './../utils/helper.util';
import * as React from "react";
import { SliderDirection } from "../types/slider.type";
import { useThrottle } from "./use-throttle.hook";

export function useKeyboardSlider({ onKeyup, delay = 400 }: { onKeyup: (direction: SliderDirection) => void, delay?: 400 }): {
    handleKeyPress: React.KeyboardEventHandler<HTMLElement>;
} {
    const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'ArrowLeft') {
            onKeyup(SliderDirection.LEFT);
        } else if (e.key === 'ArrowRight') {
            onKeyup(SliderDirection.RIGHT);
        }
    }
    const handleKeyPress = useThrottle(onKeyPress, delay);

    return { handleKeyPress };

}