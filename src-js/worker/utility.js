
import RSWorker from './rs.worker';
import JSWorker from './js.worker';

const createPromiseWorker = Worker => {
    const worker = new Worker();
    const eventListener = [];

    worker.onmessage = function (event) {
        eventListener[parseInt(event.data.id)].resolve(event.data);
    };

    const postMessage = payload => {
        const id = eventListener.length;

        return new Promise((resolve, reject) => {
            eventListener[id] = { resolve, reject };
            worker.postMessage({ id, payload });
        });
    };

    return {
        // postMessage,
        postMessage: payload => {
            return new Promise((resolve, reject) => {
                void setTimeout(() => {
                    postMessage(payload)
                        .then(resolve)
                        .catch(reject)
                }, 100);
            });
        }
    }
};

const rsWorker = createPromiseWorker(RSWorker);
const jsWorker = createPromiseWorker(JSWorker);

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

export const runBenchmark = (payload, times, cycle) => {
    return _benchmarkWorker([
        () => rsWorker.postMessage(payload),
        () => jsWorker.postMessage(payload),
    ], times, cycle);
}
