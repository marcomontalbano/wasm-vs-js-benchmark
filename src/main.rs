mod libs;

use std::env;

fn main() {
    // println!("total primes: {}", rs::primes::get_primes(100000));

    let mut args: Vec<String> = env::args().collect();

    let _script_path = args.remove(0);
    let invoked_fn = args.remove(0);

    // println!("Current path is {}", script_path);
    // println!("I should invoke '{}({})'", invoked_fn, &args[0]);

    let s: String = invoked_fn.into();

    match &s[..] {
        "get_primes" => Box::new(libs::primes::get_primes(args[0].parse().unwrap())),
        _ => {Box::new(0)}
    };
}
