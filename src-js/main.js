import { createBenchmarkChart } from './web/chart';

// createBenchmarkChart({
//     method: 'get_primes',
//     args: [100000]
// });

createBenchmarkChart({
    method: 'multiply',
    args: [
        Array(500).fill(Array(500).fill(1)),
        Array(500).fill(Array(500).fill(1)),
    ]
});
