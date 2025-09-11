import { useState, useLayoutEffect } from 'react';

export function useWidth<T extends HTMLElement>(ref: React.RefObject<T>): number {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (ref.current) {
            setWidth(ref.current.offsetWidth);
            const handleResize = () => setWidth(ref.current!.offsetWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [ref]);

    return width;
}