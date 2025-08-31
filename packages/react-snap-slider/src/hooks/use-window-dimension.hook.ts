import { debounce } from '../utils/helper.util';
import { useState, useEffect } from 'react';

interface WindowSize {
    width: number;
    height: number;
}

export function useWindowDimensions(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window?.innerWidth,
        height: window?.innerHeight,
    });

    useEffect(() => {
        const handleResize: () => void = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}
