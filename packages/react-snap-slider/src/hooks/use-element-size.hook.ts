import { useState, useLayoutEffect } from "react";
export interface ElementSize { width: number; height: number }
export function useElementSize<T extends HTMLElement>(ref: React.RefObject<T>, deps: React.DependencyList = []): ElementSize {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (ref.current) {
            const { offsetWidth, offsetHeight } = ref.current;
            setSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [...deps]);
    return size;
}
