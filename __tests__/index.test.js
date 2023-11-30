// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

// test('task1', () => {
//   const validator = new Validator();
//   const schema = validator.number();

//   assert.equal(schema.isValid(null), false);
//   assert.equal(schema.isValid(''), false);
//   assert.equal(schema.isValid(true), false);
//   assert.equal(schema.isValid(123), true);
//   assert.equal(schema.isValid(0), true);
//   assert.equal(schema.isValid(2), true);
//   assert.equal(schema.isValid(-3), true);
//   assert.equal(schema.isValid(4.1), true);
// });

// test('task2', () => {
//   const v = new Validator();
//   const schema1 = v.array();
//   const schema2 = v.array().allIntegers();

//   assert.equal(schema1.isValid([]), true);
//   assert.equal(schema1.isValid([1, 2]), true);
//   assert.equal(schema1.isValid([1, 2, 1.2]), true);
//   assert.equal(schema1.isValid(12), false);
//   assert.equal(schema1.isValid({}), false);

//   assert.equal(schema2.isValid([]), true);
//   assert.equal(schema2.isValid([1, 2]), true);
//   assert.equal(schema2.isValid([1, 2, 3, 6.7]), false);
// });

// test('task3', () => {
//   const v = new Validator();
//   const schema1 = v.array().custom((element) => (element % 2) === 0);

//   assert.equal(schema1.isValid([2, 4]), true);
//   assert.equal(schema1.isValid([1, 2]), false);
//   assert.equal(schema1.isValid([1, 2, 1.2]), false);
//   assert.equal(schema1.isValid([2, 4, 55556, 6, 78]), true);

//   const schema2 = v.array().custom((element) => Array.isArray(element));
//   assert.equal(schema2.isValid([[1], [2]]), true);
//   assert.equal(schema2.isValid([1, 2]), false);
//   assert.equal(schema2.isValid([1, 2, 1.2]), false);
//   assert.equal(schema2.isValid([[122, 2], [2, 1, 2, [2, 2]]]), true);
// });

// test('task4', () => {
//   const v = new Validator();

//   const schema = v.object().shape({
//     num: v.number(),
//     array: v.array().allIntegers(),
//   });

//   assert.equal(schema.isValid({ num: 54, array: [1, 2, 3, 5, 65, 2] }), true);
//   assert.equal(schema.isValid({ num: 2, array: [1, 2, '4'] }), false);
// });

test('task5', () => {
  const v = new Validator();

  const schema = v.object().shape({
    num: v.number(),
    obj: {
      array: v.array().allIntegers(),
      innerObj: {
        num: 2,
        deepestObj: {
          num: 5
        }
      }
    }
  });

  assert.equal(schema.isValid({ num: 54, obj: { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 5 } } } }), true);
  assert.equal(schema.isValid({ num: 54, obj: { array: [1, 2], innerObj: { num: 2, deepestObj: { num: 'gg' } } } }), false);
});
