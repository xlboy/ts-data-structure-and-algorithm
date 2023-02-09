import { expect, test } from "vitest";

/**
 * 
 * @关键词 `范围圈`、`最小值`
 * @大致思路 递减式的缩小范围圈，将每轮“范围圈”内的“最小值”记录下来，然后挪到当前“范围圈”的头部
 */
function core(arr: Array<number>): Array<number> {
  let loopLength = arr.length - 1;

  for (let i = 0; i < loopLength; i++) {
    let minIndex = i;

    for (let j = i; j < loopLength + 1; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

test("1", () => {
  expect(core([5, 1, 9, 88, 11])).toMatchObject([1, 5, 9, 11, 88]);
});
