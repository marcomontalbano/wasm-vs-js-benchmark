
import * as mod from '../mod';
import { measure } from './performance';

onmessage = e => {

    const performance = measure(e.data.method, () => {
        return mod[e.data.method](...e.data.args)
    })

    postMessage({
        data: { ...e.data, worker: 'js' },
        performance
    })

}
