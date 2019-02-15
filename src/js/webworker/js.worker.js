
import * as mod from '../mod';

onmessage = e => {

    performance.mark(`${e.data.method}-start`);
    const value = mod[e.data.method](...e.data.args);
    performance.mark(`${e.data.method}-end`);

    performance.measure(`${e.data.method}-measure`, `${e.data.method}-start`, `${e.data.method}-end`);

    const measures = performance.getEntriesByName(`${e.data.method}-measure`);
    const measure = measures[measures.length - 1];

    postMessage({
        data: { worker: 'js', ...e.data },
        value,
        measures: measures.map(e => e.toJSON()),
        measure: measure.toJSON(),
    });
}
