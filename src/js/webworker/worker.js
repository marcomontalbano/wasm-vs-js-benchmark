
import RSWorker from './rs.worker';
import JSWorker from './js.worker';

const rsWorker = new RSWorker();
const jsWorker = new JSWorker();

const worker_postMessage = (worker, message) => {
    return new Promise((resolve, reject) => {
        worker.onmessage = event => {
            resolve(event.data);
        };
        worker.onerror = e => reject(e);
        worker.onmessageerror = e => reject(e);
        worker.postMessage(message);
    });
}

const worker_setTimeout_postMessage = (worker, message, time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            worker_postMessage(worker, message)
                .then(v => resolve(v))
                .catch(e => reject(e))
        }, time);
    });
}

const _benchmarkWorker = (fns, times, cycle = () => {}) => {
    const values = [];
    return fns.reduce((res, current) => res.concat(Array(times).fill(current)), [])
        .reduce((promise, fn) => {
            return promise
                .then(value => {
                    if (value) {
                        cycle(value);
                        values.push(value);
                    }
                    return fn(value);
                })
        }, Promise.resolve())
        .then((value) => {
            cycle(value);
            values.push(value);
            return values;
        })
};

export const benchmarkWorker = (message, times, cycle, timeout = 100) => {
    return _benchmarkWorker([
        () => worker_setTimeout_postMessage(rsWorker, message, timeout),
        () => worker_setTimeout_postMessage(jsWorker, message, timeout),
    ], times, cycle);
}
