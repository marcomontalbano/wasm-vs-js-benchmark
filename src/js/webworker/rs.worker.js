
import wasm from '../../../pkg/wa_vs_js_benchmark_bg.wasm';
import * as _exp from '../../../pkg/wa_vs_js_benchmark';

var importObject = {
    './wa_vs_js_benchmark': _exp
}

onmessage = e => {

    WebAssembly.instantiateStreaming(fetch(wasm), importObject)
        .then(results => {

            performance.mark(`${e.data.method}-start`);
            const value = results.instance.exports[e.data.method](...e.data.args);
            performance.mark(`${e.data.method}-end`);

            performance.measure(`${e.data.method}-measure`, `${e.data.method}-start`, `${e.data.method}-end`);

            const measures = performance.getEntriesByName(`${e.data.method}-measure`);
            const measure = measures[measures.length -1];

            postMessage({
                data: { worker: 'rs', ...e.data },
                value,
                measures: measures.map(e => e.toJSON()),
                measure: measure.toJSON(),
            });
        });
}
