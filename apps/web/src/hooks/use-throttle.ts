export default function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
    let inThrottle: boolean = false;
    let lastFn: ReturnType<typeof setTimeout>;
    let lastTime: number;

    return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
        const context = this;

        if (!inThrottle) {
            inThrottle = true;
            lastTime = Date.now();
            return func.apply(context, args) as ReturnType<T>;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(() => {
                if (Date.now() - lastTime >= delay) {
                    lastTime = Date.now();
                    return func.apply(context, args) as ReturnType<T>;
                }
            }, Math.max(delay - (Date.now() - lastTime), 0));
        }
        return undefined; // Return undefined when throttled
    };
}