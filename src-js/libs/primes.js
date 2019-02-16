const is_prime = n => {

    for (let x = 2; x < n; x++) {
        if (n % x === 0) {
            return false;
        }
    }

    return n >= 2;
}

export const get_primes = n => {
    let i = 0;

    for (let x = 0; x < n; x += 1) {

        if (is_prime(x)) {
            i += 1;
        }

    }

    return i;
};
