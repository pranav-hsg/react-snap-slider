

import { useState, useEffect } from 'react';
import { debounce } from '../utils/helper.util';


interface WindowSize {
    width: number;
    height: number;
}

export function useWindowDimensions({ delay = 400 }): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window?.innerWidth,
        height: window?.innerHeight,
    });

    useEffect(() => {
        const handleResize: () => void = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        const debouncedHandleResize = debounce(handleResize, delay);
        window.addEventListener('resize', debouncedHandleResize);

        handleResize();

        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, []);

    return windowSize;
}
