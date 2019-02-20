# WebAssembly vs Javascript

[![Build Status](https://travis-ci.org/marcomontalbano/wa-vs-js-benchmark.svg?branch=master)](https://travis-ci.org/marcomontalbano/wa-vs-js-benchmark)

*A comparison between WebAssembly and Javascript made for ~~studying~~ fun.*

## What's in the box

- WebAssembly with Rust
- Benchmark with fancy charts
- Web Workers to avoid a frozen main thread
- Build and deploy with Travis CI

## Rust and WebAssembly

There are two books that fully cover this section:

- https://doc.rust-lang.org/book
- https://rustwasm.github.io/book

In this project I'm also using [`wasm-bingen`](https://rustwasm.github.io/wasm-bindgen) and [`wasm-pack`](https://github.com/rustwasm/wasm-pack).

## Project

### Folder Structure

Source code is splitted into two main folders: `src` that contains our Rust application and `src-js` that contains our Javascript application.

I tried to make their folder structure as similar as possible:

```sh
src
├── libs
│   ├── mod.rs
│   ├── ...
│   └── primes.rs
└── main.rs

src-js
├── libs
│   ├── mod.js
│   ├── ...
│   └── primes.js
├── ...
├── bootstrap.js
└── main.js
```

**`*/libs/mod.*`** is the entry point for declaring all modules. The `.rs` version of this file will be compiled to `.wasm`.

**`*/libs/primes.*`** is a module example, written both in Rust and Javascript.

**`*/main.*`** is the entry point for the application. The `.rs` file is the one used by `cargo run` command. The `.js` file is the one used by webpack.

**`./src-js/bootstrap.js`** is the bootstrap file for the web application that loads the `main.js` file asynchronously.


### Rust

The first step is to [install Rust](https://doc.rust-lang.org/stable/book/ch01-01-installation.html). We’ll download Rust through `rustup`, a command line tool for managing Rust versions and associated tools.

Runnig following command we'll install Rust and [Cargo](https://doc.rust-lang.org/cargo) automatically.

```sh
$ curl https://sh.rustup.rs -sSf | sh

# install `wasm-pack`
$ cargo install wasm-pack
```

Now we are able to use the following commands from our project folder.

```sh
# test .rs files
$ cargo test

# compile `src/main.rs`
$ cargo build
    Finished dev [unoptimized + debuginfo] target(s)

# or compile `src/main.rs` with optimizations
$ cargo build --release
    Finished release [optimized] target(s)
```

Now that we have built our code, we can run it:

```sh
$ ./target/release/wa-vs-js-benchmark get_primes 11
```

We can also use `cargo run` to compile and then run it, all in one step:

```sh
$ cargo run get_primes 11

# compile and run our project with optimizations
$ cargo run --release get_primes 11
```

Last but not least, we'll compile our project to `.wasm`:

```sh
$ wasm-pack build
```

Now we are able to use the content of `./pkg` folder for our web application.


### Javascript

The goal of this project is benchmarking WebAssembly and Javascript. Some task will use big computations that takes time to execute.

[`Web Workers`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) makes it possible to run a script operation in a background thread separate from the main execution thread of a web application.

The web application is bundled with [`Webpack`](https://webpack.js.org/).

Run following command to start it:

```sh
$ npm run build:wasm
$ npm start
```

Project is running at http://localhost:8080/


## Benchmark

### Rust to Native Code

The execution time of .wasm binaries is just a bit slower than the execution of same native code.

For benchmarking the native code, I use [Hyperfine](https://github.com/sharkdp/hyperfine).

These benchmarks are recorded on a MacBook Pro (15-inch, 2016) having these specs:

- macOS Mojave
- 2,6 GHz Intel Core i7 (4 cores)
- 16 GB 2133 MHz LPDDR3

```sh
cargo build --release
hyperfine --warmup 3 './target/release/wa-vs-js-benchmark get_primes 100000'
```

| Command | Mean [s] | Min…Max [s] |
|:---|---:|---:|
| `./target/release/wa-vs-js-benchmark get_primes 100000` | 1.204 ± 0.012 | 1.193…1.235 |


### WebAssembly vs Javascript

https://marcomontalbano.github.io/wa-vs-js-benchmark


## Useful Links

- https://webassembly.org/

- https://doc.rust-lang.org/book
- https://doc.rust-lang.org/rust-by-example

- https://developer.mozilla.org/en-US/docs/WebAssembly
- https://developer.mozilla.org/en-US/docs/WebAssembly/rust_to_wasm

- https://rustwasm.github.io/book
- https://rustwasm.github.io/wasm-bindgen

- https://github.com/rustwasm/create-wasm-app
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
- https://blog.logrocket.com/webassembly-how-and-why-559b7f96cd71

