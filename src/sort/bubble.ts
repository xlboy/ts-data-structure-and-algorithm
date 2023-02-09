import { expect, test } from "vitest";

/**
 * 
 * @关键词 `范围圈`、`两两对比`
 * @大致思路 递减式的缩小`范围圈`，将每轮`范围圈`内的最小的值往前挪（**两两对比后挪位**），以此来达到排序目的
 */
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
