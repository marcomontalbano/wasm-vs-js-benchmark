
import wasm from '../../pkg/wa_vs_js_benchmark_bg.wasm';
import * as _exp from '../../pkg/wa_vs_js_benchmark';
import { measure } from './performance';

onmessage = e => {

    WebAssembly.instantiateStreaming(fetch(wasm), { './wa_vs_js_benchmark': _exp }).then(results => {

        const performance = measure(e.data.payload.method, () => {
            return results.instance.exports[e.data.payload.method](...e.data.payload.args)
        })

        postMessage({
            ...e.data,
            workerName: 'rs',
            performance
        })

    });
}