extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[allow(dead_code)]
fn is_prime(n: i32) -> bool {

    for x in 2..n {
        if n % x == 0 {
            return false;
        }
    }

    return n >= 2;
}

#[wasm_bindgen]
#[allow(dead_code)]
pub fn get_primes(n: i32) -> i32 {
    let mut i = 0;

    for x in 2..n+1 {

        if is_prime(x) {
            i += 1;
        }

    }

    return i;
}

#[cfg(test)]
mod tests {

    // importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_is_prime() {
        assert_eq!(is_prime(2), true);
        assert_eq!(is_prime(97), true);
    }

    #[test]
    fn test_get_primes() {
        assert_eq!(get_primes(11), 5);
    }
}
