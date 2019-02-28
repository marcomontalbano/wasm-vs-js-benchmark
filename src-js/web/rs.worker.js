
import wasm from '../../pkg/wasm_vs_js_benchmark_bg.wasm';
import * as _exp from '../../pkg/wasm_vs_js_benchmark';
import { measure } from './performance';

onmessage = e => {

    // WebAssembly.instantiateStreaming(fetch(wasm), { './wasm_vs_js_benchmark': _exp }).then(results => {
    fetch(wasm).then(response => response.arrayBuffer()).then(bytes => WebAssembly.instantiate(bytes, { './wasm_vs_js_benchmark': _exp })).then(results => {

        const method = `${e.data.payload.module}_${e.data.payload.method}`;
        const performance = measure(method, () => {
            return results.instance.exports[method](...e.data.payload.args)
        })

        postMessage({
            ...e.data,
            workerName: 'rs',
            performance
        })

    });
}
