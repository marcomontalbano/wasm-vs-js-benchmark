
import { js_get_primes } from '../primes';

onmessage = e => {

    const begin = Date.now();
    const value = js_get_primes(100000);
    const end = Date.now();
    const diff = end - begin;

    postMessage({
        data: e.data,
        value,
        diff,
    });

}
