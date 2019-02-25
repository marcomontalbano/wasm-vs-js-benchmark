import assert from 'assert';

import * as matrix from './matrix';

const createTestFor = method => {
    describe(`.${method}()`, () => {
        it('test 1', () => {
            const expected = [
                [7, 10],
                [15, 22],
            ];

            assert.deepEqual(matrix[method](
                [
                    [1, 2],
                    [3, 4]
                ],
                [
                    [1, 2],
                    [3, 4]
                ]
            ), expected);
        });

        it('test 2', () => {
            const expected = [
                [58, 64],
                [139, 154],
            ];

            assert.deepEqual(matrix[method](
                [
                    [1, 2, 3],
                    [4, 5, 6]
                ],
                [
                    [7, 8],
                    [9, 10],
                    [11, 12]
                ]
            ), expected);
        });

        it('test 3', () => {
            const expected = [[83, 63, 37, 75]];

            assert.deepEqual(matrix[method](
                [[3, 4, 2]],
                [
                    [13, 9, 7, 15],
                    [8, 7, 4, 6],
                    [6, 4, 0, 3]
                ]
            ), expected);
        });

        it('test 4', () => {
            const expected = [[4, 4], [10, 8]];

            assert.deepEqual(matrix[method](
                [
                    [1, 2],
                    [3, 4],
                ],
                [
                    [2, 0],
                    [1, 2],
                ]
            ), expected);
        });
    });
}

describe('matrix', () => {
    createTestFor('_multiply');
    createTestFor('_multiply_slower');

    it('.multiply()', () => {
        assert.deepEqual(matrix.multiply(10, 10), 10);
    });

    it('.multiply_slower()', () => {
        assert.deepEqual(matrix.multiply_slower(10, 10), 10);
    });
});
