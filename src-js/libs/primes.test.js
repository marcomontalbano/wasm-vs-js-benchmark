import assert from 'assert';

import * as primes from './primes';

describe('primes', () => {
    it('get_primes(11) should be 5', () => {
        assert.equal(primes.get_primes(11), 5);
    });
});
