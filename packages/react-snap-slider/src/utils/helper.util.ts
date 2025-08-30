// Throttler
export const throttle = (func: any) => {
    let timeout: number;
    return function (...args: any) {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
            }, 400);
            func(...args);
        }
    };
}
// Debounce function
export const debounce = ((func: any, ...args: any) => {
    let timeout: number;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), 600);
    };
})