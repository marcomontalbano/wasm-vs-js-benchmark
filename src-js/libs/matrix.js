export const multiply = (a, b) => {
    let c = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b[0].length; j++) {
            for (let k = 0; k < b.length; k++) {
                c[i] = c[i] || [];
                c[i][j] = c[i][j] || 0;
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return c;
};

export const multiply_slower = (a, b) => {
    let c = [];
    for (let k = 0; k < b.length; k++) {
        for (let j = 0; j < b[0].length; j++) {
            for (let i = 0; i < a.length; i++) {
                c[i] = c[i] || [];
                c[i][j] = c[i][j] || 0;
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return c;
};
