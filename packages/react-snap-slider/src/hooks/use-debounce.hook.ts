import { useCallback, useEffect, useRef } from 'react';
// Debounce function, here Parameters<T> is used to infer the parameter types of the function T
// Also T extends (...args: any[]) => void ensures that T is a function type
export function useDebounce<T extends (...args: any[]) => void>(func: T, delay = 600): (...args: Parameters<T>) => void {
    const ref = useRef<T | null>(null);
    const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        ref.current = func;
    }, [func]);


    const debouncedCallback = useCallback((...args: Parameters<T>) => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(() => {
            ref.current?.(...args);
        }, delay);
    }, []);

    return debouncedCallback;
}
// export const debounce = <T extends (...args: any[]) => void>(func: T): (...args: Parameters<T>) => void => {

// };