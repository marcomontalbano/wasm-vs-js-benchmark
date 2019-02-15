
import wasm from '../../../pkg/wa_vs_js_benchmark_bg.wasm';
import * as _exp from '../../../pkg/wa_vs_js_benchmark';
import { measure } from './performance';

onmessage = e => {

    WebAssembly.instantiateStreaming(fetch(wasm), { './wa_vs_js_benchmark': _exp }).then(results => {

        const performance = measure(e.data.method, () => {
            return results.instance.exports[e.data.method](...e.data.args)
        })

        postMessage({
            data: { ...e.data, worker: 'rs' },
            performance
        })

    });
}
