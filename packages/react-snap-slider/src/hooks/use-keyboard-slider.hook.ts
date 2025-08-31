import { throttle } from './../utils/helper.util';
import * as React from "react";
import { SliderDirection } from "../types/slider.type";

export function useKeyboardSlider({ onKeyup }: { onKeyup: (direction: SliderDirection) => void }): {
    handleKeyPress: React.KeyboardEventHandler<HTMLElement>;
} {
    const throttledOnKeyup = throttle((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'ArrowLeft') {
            onKeyup(SliderDirection.LEFT);
        } else if (e.key === 'ArrowRight') {
            onKeyup(SliderDirection.RIGHT);
        }
    });
    const handleKeyPress = throttledOnKeyup;

    return { handleKeyPress };

}