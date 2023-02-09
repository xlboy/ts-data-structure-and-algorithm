import { expect, test } from "vitest";

/**
 *
 * @关键词 `折半搜索范围`、`有序元素条件`
 * @大致思路  因**搜索范围**是有序的，所以可以根据**当前的中间元素**来取出「可行」的搜索范围（进一步的缩小了搜索范围），直到找到目标元素或者搜索范围为空
 * @复杂度 O(log(arr.length))
 */
function core(arrSource: Array<number>, targetItem: number): number {
  let startIndex = 0;
  let endIndex = arrSource.length;

  let curMiddleIndex!: number;
  while (arrSource.length > 0) {
    curMiddleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);

    // 证明搜索范围为空
    if (curMiddleIndex === endIndex || curMiddleIndex === startIndex) {
      break;
    }

    const middleItem = arrSource[curMiddleIndex];

    if (middleItem === targetItem) {
      return curMiddleIndex;
    }

    // 「可行」的搜索范围在左边
    if (middleItem > targetItem) {
      endIndex = curMiddleIndex;
    } else {
      startIndex = curMiddleIndex;
    }
  }

  return -1;
}

test("1", () => {
  expect(core([55, 1, 9, 123, 88, 11], 91)).toBe(-1);
  expect(core([], 9)).toBe(-1);
  expect(core([55, 1, 9, 123], 123)).toBe(3);
});
