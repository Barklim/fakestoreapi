type DebounceFunction = (func: (...args: any[]) => void | void, wait: number, immediate?: boolean) => (...args: any[]) => void;

export const useDebounce: DebounceFunction = (func, wait, immediate = false) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        const context = this;

        clearTimeout(timeout);

        if (immediate && !timeout) {
            func.apply(context, args);
        }

        timeout = setTimeout(() => {
            // @ts-ignore
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
    };
};