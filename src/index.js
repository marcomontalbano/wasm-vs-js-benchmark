
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

const runMethodMultipleTimes = (method, times) => {
    const values = [];
    return [...Array(times +1).keys()]
        .map(i => {
            return () => method()
        })
        .reduce((p, fn) => {
            return p.then(value => {
                if (value !== undefined) {
                    values.push(value);
                }
                if (values.length === times) {
                    return values;
                }

                return fn(value);
            })
        }, Promise.resolve())
};

runMethodMultipleTimes(() => {
    return createWorker(RSWorker, {
        method: 'get_primes',
        args: [100000]
    })
}, 2).then((results) => {
    console.log(`RS done`, results);

    runMethodMultipleTimes(() => {
        return createWorker(JSWorker, {
            method: 'get_primes',
            args: [100000]
        })
    }, 2).then((results) => {
        console.log(`JS done`, results);
    });
});
