import { debounce } from '../utils/helper.util';
import { useState, useEffect } from 'react';

export function useWindowDimensions() {

    const [windowSize, setWindowSize] = useState({
        width: window?.innerWidth,
        height: window?.innerHeight,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        });

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize; // { width, height }
}
