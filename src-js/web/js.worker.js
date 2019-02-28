
import * as mod from '../libs/mod';
import { measure } from './performance';

onmessage = e => {

    const method = `${e.data.payload.module}_${e.data.payload.method}`;
    const performance = measure(method, () => {
        return mod[e.data.payload.module][e.data.payload.method](...e.data.payload.args)
    })

    postMessage({
        ...e.data,
        workerName: 'js',
        performance
    })

}
