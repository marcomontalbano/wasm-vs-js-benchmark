
import * as mod from '../mod';

onmessage = e => {

    const begin = Date.now();
    const value = mod[e.data.method](...e.data.args);
    const end = Date.now();
    const executionTime = end - begin;

    postMessage({
        data: { worker: 'js', ...e.data },
        value,
        executionTime,
    });

}
