// Throttler here Parameters<T> is used to infer the parameter types of the function T
// Also T extends (...args: any[]) => void ensures that T is a function type
export const throttle = <T extends (...args: any[]) => void>(func: T): (...args: Parameters<T>) => void => {
    let timeout: number;
    let random = Math.random() * 1000;
    console.log('throttle defined', random);
    return function (...args: Parameters<T>) {
        console.log('throttle called', random);
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
            }, 1000);
            func(...args);
        }
    };
};

// Debounce function, here Parameters<T> is used to infer the parameter types of the function T
// Also T extends (...args: any[]) => void ensures that T is a function type
export const debounce = <T extends (...args: any[]) => void>(func: T): (...args: Parameters<T>) => void => {
    let timeout: number;
    return function (...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), 600);
    };
};