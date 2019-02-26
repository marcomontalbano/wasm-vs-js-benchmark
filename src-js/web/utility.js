
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

export const cloneArrayElements = (arr, times) => {
    return arr.reduce((accumulator, currentValue) => {
        return accumulator.concat(Array(times).fill(currentValue))
    }, [])
}

export const promiseSequential = fns => {
    return fns.reduce((promise, fn) => {
        return promise.then(results => {
            return fn().then([].concat.bind(results));
        })
    }, Promise.resolve([]))
};

export const runBenchmark = (payload, times = 5, eachTime = value => value) => {
    return promiseSequential(cloneArrayElements([
        () => rsWorker.postMessage(payload).then(eachTime),
        () => jsWorker.postMessage(payload).then(eachTime),
    ], times));
}
