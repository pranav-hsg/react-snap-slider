import { useCallback, useEffect, useRef } from "react";

export function useThrottle<T extends (...args: any[]) => void>(func: T, delay = 600): (...args: Parameters<T>) => void {
    const ref = useRef<T | null>(null);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        ref.current = func;
    }, [func]);

    const throttledCallback = useCallback((...args: Parameters<T>) => {
        if (!timerId.current) {
            timerId.current = setTimeout(() => {
                timerId.current = null;
            }, delay);
            ref.current?.(...args);
        }
    }, []);

    return throttledCallback;
}