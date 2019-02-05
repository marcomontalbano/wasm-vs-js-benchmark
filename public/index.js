import { rs_get_primes } from '../pkg/wa_vs_js_benchmark';
import { js_get_primes } from './primes';


let jsBegin = Date.now();
console.log(`JS | total primes: ${js_get_primes(100000)}`);
let jsEnd = Date.now();

let rsBegin = Date.now();
console.log(`RS | total primes: ${rs_get_primes(100000)}`);
let rsEnd = Date.now();

let jsDiff = jsEnd - jsBegin;
let rsDiff = rsEnd - rsBegin;

console.log(`prime.js: ${jsDiff} ms`);
console.log(`prime.rs: ${rsDiff} ms`);

console.log(`WA is faster than JS: ${jsDiff - rsDiff} ms`);
console.log(`${((rsDiff * 100 / jsDiff) - 100).toFixed(2)}%`);
