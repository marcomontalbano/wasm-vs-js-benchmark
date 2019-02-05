extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

pub fn rs_is_prime(n: i32) -> bool {

    for x in 2..n {
        if n % x == 0 {
            return false;
        }
    }

    return n >= 2;
}

#[wasm_bindgen]
pub fn rs_get_primes(n: i32) -> i32 {
    let mut i = 0;

    for x in 2..n {

        if rs_is_prime(x) {
            i += 1;
        }

    }

    return i;
}
