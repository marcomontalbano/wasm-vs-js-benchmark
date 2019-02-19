
import * as mod from '../libs/mod';
import { measure } from './performance';

onmessage = e => {

    const performance = measure(e.data.payload.method, () => {
        return mod[e.data.payload.method](...e.data.payload.args)
    })

    postMessage({
        ...e.data,
        workerName: 'js',
        performance
    })

}
