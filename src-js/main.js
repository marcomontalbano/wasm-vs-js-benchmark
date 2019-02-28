import { createBenchmarkChart } from './web/chart';
import { promiseSequential } from './web/utility';

promiseSequential([
    createBenchmarkChart({
        module: 'primes',
        method: 'get_primes',
        args: [100000]
    }),
    createBenchmarkChart({
        module: 'matrix',
        method: 'multiply',
        args: [500, 500]
    })
]);
