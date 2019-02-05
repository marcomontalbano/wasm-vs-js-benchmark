mod wasm;

fn main() {
    println!("total primes: {}", wasm::primes::rs_get_primes(100000));
}
