type CallbackFunction = (...args: any[]) => any;

/**
 * Calling a function is not more frequent wait number.
 *
 * @param {function} func
 * @param {millisecond} wait - Minimum time between calls.
 * @param {boolean} immediate
 * @return {function}
 */
export function debounce(func: CallbackFunction, wait: number, immediate?: boolean) {
    let timeout: any;
    return function(...args: any[]) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}
