
import init, * as mod from '../../pkg/wasm_vs_js_benchmark.js';
import { measure } from './performance';

onmessage = async e => {

    await init();

    const performance = measure(e.data.payload.method, () => {
        return mod[e.data.payload.method](...e.data.payload.args)
    })

    postMessage({
        ...e.data,
        workerName: 'rs',
        performance
    })

}
