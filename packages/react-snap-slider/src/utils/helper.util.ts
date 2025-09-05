// Throttler here Parameters<T> is used to infer the parameter types of the function T
// Also T extends (...args: any[]) => void ensures that T is a function type
export const throttle = <T extends (...args: any[]) => void>(func: T, delay = 400): (...args: Parameters<T>) => void => {
    let timeout: number;
    return function (...args: Parameters<T>) {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
            func(...args);
        }
    };
};

// Debounce function, here Parameters<T> is used to infer the parameter types of the function T
// Also T extends (...args: any[]) => void ensures that T is a function type
export const debounce = <T extends (...args: any[]) => void>(func: T, delay = 400): (...args: Parameters<T>) => void => {
    let timeout: number;
    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};