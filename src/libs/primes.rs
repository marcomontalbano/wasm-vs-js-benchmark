extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Primes {
    
}

#[wasm_bindgen]
impl Primes {

    pub fn is_prime(n: i32) -> bool {

        for x in 2..n {
            if n % x == 0 {
                return false;
            }
        }

        return n >= 2;
    }

    pub fn get_primes(n: i32) -> i32 {
        let mut i = 0;

        for x in 2..n+1 {

            if Primes::is_prime(x) {
                i += 1;
            }

        }

        return i;
    }
}

#[cfg(test)]
mod tests {

    // importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_is_prime() {
        assert_eq!(Primes::is_prime(2), true);
        assert_eq!(Primes::is_prime(97), true);
    }

    #[test]
    fn test_get_primes() {
        assert_eq!(Primes::get_primes(11), 5);
    }
}
