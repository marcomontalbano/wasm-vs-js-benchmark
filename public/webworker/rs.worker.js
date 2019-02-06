
import wasm from '../../pkg/wa_vs_js_benchmark_bg.wasm';
import * as _exp from '../../pkg/wa_vs_js_benchmark';

var importObject = {
    './wa_vs_js_benchmark': _exp
}

onmessage = e => {

    WebAssembly.instantiateStreaming(fetch(wasm), importObject)
        .then(results => {

            const begin = Date.now();
            const value = results.instance.exports[e.data.method].apply(this, e.data.args);
            const end = Date.now();
            const diff = end - begin;

            postMessage({
                data: e.data,
                value,
                diff,
            });
        });
}
