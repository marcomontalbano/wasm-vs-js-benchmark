
import RSWorker from './js/webworker/rs.worker';
import JSWorker from './js/webworker/js.worker';

const createWorker = (Worker, message) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker();
        worker.onmessage = event => {
            resolve(event.data);
            worker.terminate();
        };
        worker.onerror = e => reject(e);
        worker.onmessageerror = e => reject(e);
        worker.postMessage(message);
    });
};

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

const benchmarkWorker = (message, times, cycle) => {
    return _benchmarkWorker([
        () => createWorker(RSWorker, message),
        () => createWorker(JSWorker, message),
    ], times, cycle);
}

benchmarkWorker({
        method: 'get_primes',
        args: [100000]
    },
    2,
    value => console.log(`cycle ${value.data.worker}`, value)
).then(value => console.log(`done`, value));
