extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[allow(dead_code)]
fn _multiply(a: Vec<Vec<i32>>, b: Vec<Vec<i32>>) -> Vec<Vec<i32>> {

    let mut c: Vec<Vec<i32>> = Vec::new();

    for i in 0..a.len() {
        c.push(vec![0; b.len()]);
        for j in 0..b[0].len() {
            for k in 0..b.len() {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }

    return c;
}

#[wasm_bindgen]
pub fn multiply(a: usize, b: usize) -> i32 {
    return _multiply(
        vec![vec![1; a]; a],
        vec![vec![1; b]; b]
    )[0][0];
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_private_multiply() {
        assert_eq!(_multiply(
            vec![vec![1, 2], vec![3, 4]],
            vec![vec![1, 2], vec![3, 4]]
        ), vec![vec![7, 10], vec![15, 22]]);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(multiply(10,10), 10);
    }
}
