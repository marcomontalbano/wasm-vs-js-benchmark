import { createBenchmarkChart } from './web/chart';
import { promiseSequential } from './web/utility';

promiseSequential([
    createBenchmarkChart({
        method: 'get_primes',
        args: [100000]
    }),
    createBenchmarkChart({
        method: 'multiply',
        args: [500, 500]
    })
]);
