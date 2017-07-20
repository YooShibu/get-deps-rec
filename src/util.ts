export function once<T extends Function>(func: T): T {
    let called = false;
    return function() {
        if (called === true)
            return;
        called = true;
        return func.apply(undefined, arguments);
    } as any as T
}