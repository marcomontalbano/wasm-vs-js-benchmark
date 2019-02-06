mod rs;

fn main() {
    println!("total primes: {}", rs::primes::get_primes(100000));
}
