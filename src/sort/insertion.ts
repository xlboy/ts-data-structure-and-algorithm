import { assert, expect, test } from "vitest";

// 打扑克牌似的，人眼从左往右扫，将“当前扫到的内容”与“前面的内容”进行对比，看看“哪个内容”是比“当前扫到的内容”小的。紧接着就插入到“哪个内容”的后面
function core(arr: Array<number>): Array<number> {
  let loopLength = arr.length;

  for (let i = 0; i < loopLength; i++) {
    const currentNum = arr[i];
    let j = i - 1;

    for (; i >= 0 && currentNum < arr[j]; j--) {
      // 眼球扫视的同时，被扫过的牌其实是已经改变了顺序位置了
      arr[j + 1] = arr[j];
    }

    arr[j + 1] = currentNum;
  }

  return arr;
}

test("1", () => {
  expect(core([55, 1, 9, 1, 88, 0])).toMatchObject([0, 1, 1, 9, 55, 88]);
});
