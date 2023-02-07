import { assert, expect, test } from "vitest";

// 递减式的缩小范围圈，将每轮范围圈内的最小的值往前挪（两两对比后“挪位”），以此来达到排序目的
function core(arr: Array<number>): Array<number> {
  let loopLength = arr.length - 1;
  
  for (let i = 0; i < loopLength; i++) {
    for (let j = i; j < loopLength; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }

  return arr;
}

test("1", () => {
  expect(core([55, 1, 9, 123, 88, 11])).toMatchObject([1, 9, 11, 55, 88, 123]);
});
