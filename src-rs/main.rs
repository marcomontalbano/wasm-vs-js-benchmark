mod libs;

use std::env;

fn main() {
    let mut args: Vec<String> = env::args().collect();

    let _script_path = args.remove(0);
    let invoked_fn = args.remove(0);

    let s: String = invoked_fn.into();

    let result = match &s[..] {
        "primes-get_primes" => libs::primes::get_primes(args[0].parse().unwrap()),
        "matrix-multiply" => libs::matrix::multiply(args[0].parse().unwrap(), args[1].parse().unwrap()),
        _ => 0
    };

    println!("Result for \"{}\" is \"{}\".", s, result);
}
