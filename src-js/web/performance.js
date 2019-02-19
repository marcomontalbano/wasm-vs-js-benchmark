
export const measure = (name, fn) => {

    performance.mark(`${name}-start`);
    const fn_return = fn();
    performance.mark(`${name}-end`);

    performance.measure(`${name}-measure`, `${name}-start`, `${name}-end`);

    const measures = performance.getEntriesByName(`${name}-measure`);
    const measure = measures[measures.length - 1];

    return {
        fn_return,
        entries: measures.map(e => e.toJSON()),
        measure: measure.toJSON(),
    }

}
