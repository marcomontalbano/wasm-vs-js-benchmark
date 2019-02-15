# WebAssembly vs Javascript


Some usefull task for Rust and WebAssembly:

```sh

cargo test

cargo build
cargo run

cargo build --release
cargo run --release

./target/release/wa-vs-js-benchmark
```

## Compile

```sh
wasm-pack build
```

## Benchmark

### Compiled

[Hyperfine](https://github.com/sharkdp/hyperfine)

```sh
cargo build --release
hyperfine --warmup 3 './target/release/wa-vs-js-benchmark get_primes 100000'
```

| Command | Mean [s] | Min…Max [s] |
|:---|---:|---:|
| `./target/release/wa-vs-js-benchmark get_primes 100000` | 1.204 ± 0.012 | 1.193…1.235 |


## Folder Structure



## Further Readings

- https://doc.rust-lang.org/book
- https://doc.rust-lang.org/rust-by-example

- https://webassembly.org/

- https://developer.mozilla.org/en-US/docs/WebAssembly
- https://developer.mozilla.org/en-US/docs/WebAssembly/rust_to_wasm

- https://rustwasm.github.io/book
- https://rustwasm.github.io/wasm-bindgen

## Usefull Links

- https://github.com/rustwasm/create-wasm-app
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers


- performance.mark()
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark
