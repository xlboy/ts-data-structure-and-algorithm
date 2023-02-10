import { expect, test } from "vitest";

//#region  //*=========== base ===========
/**
 *
 * @关键词 `折半搜索范围`、`有序元素条件`
 * @大致思路  因**搜索范围**是有序的，所以可以根据**当前的中间元素**来取出「可行」的搜索范围（进一步的缩小了搜索范围），直到找到目标元素或者搜索范围为空
 * @复杂度 O(log(arr.length))
 */
function base(arrSource: Array<number>, targetItem: number): number {
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

test("base", () => {
  expect(base([55, 1, 9, 123, 88, 11], 91)).toBe(-1);
  expect(base([], 9)).toBe(-1);
  expect(base([55, 1, 9, 123], 123)).toBe(3);
});

//#endregion  //*======== base ===========

//#region  //*=========== 35. 搜索插入位置（https://leetcode.cn/problems/search-insert-position/） ===========
/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 请必须使用时间复杂度为 O(log n) 的算法。
 */
function searchInsertPosition1(nums: number[], target: number): number {
  let startIndex = 0;
  let endIndex = nums.length;

  let curMiddleIndex!: number;
  while (true) {
    curMiddleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);

    // 证明搜索范围为空，且这里会是“即将要插入的位置”【标1】（因为「可行」的搜索范围是基于“比较大小”进行的。目前的这个位置是最接近 target 值的，所以能轻松得出【标1】）
    if (curMiddleIndex === endIndex || curMiddleIndex === startIndex) {
      if (target <= nums[startIndex]) {
        return startIndex;
      }
      return endIndex;
    }

    const middleItem = nums[curMiddleIndex];

    if (middleItem === target) {
      return curMiddleIndex;
    }

    if (middleItem > target) {
      endIndex = curMiddleIndex;
    } else {
      startIndex = curMiddleIndex;
    }
  }

  return nums.length;
}

function searchInsertPosition2(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) {
      l = mid + 1;
    } else if (nums[mid] > target) {
      r = mid - 1;
    }
  }

  return r + 1;
}

//#endregion  //*======== 35. 搜索插入位置（https://leetcode.cn/problems/search-insert-position/） ===========

//#region  //*=========== 34. 在排序数组中查找元素的第一个和最后一个位置（https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/） ===========

function searchRange(nums: number[], target: number): number[] {
  const range = { l: -1, r: -1 };
  let l = 0;
  let r = nums.length - 1;

  let inLeftSearch = false;
  let inRightSearch = false;
  let tempR!: number;

  while (l <= r) {
    const curMidIndex = Math.floor((l + r) / 2);
    const curMidItem = nums[curMidIndex];

    // 还在寻找首个中间 target 值
    if (!inLeftSearch && !inRightSearch) {
      if (curMidItem === target) {
        inLeftSearch = true;
        range.r = curMidIndex;
        tempR = r;
        r = curMidIndex - 1;
      } else if (curMidItem > target) {
        r = curMidIndex - 1;
      } else l = curMidIndex + 1;
    } else {
      if (inLeftSearch) {
        if (curMidItem === target) {
          range.l = curMidIndex;
          r = curMidIndex - 1;
        } else {
          l = curMidIndex + 1;
        }

        if (l === r) {
          if (nums[l] === target) {
            range.l = l;
          }

          inLeftSearch = false;
          inRightSearch = true;
          l = range.r + 1;
          r = tempR;
        }
      } else if (inRightSearch) {
        if (curMidItem === target) {
          range.r = curMidIndex;
          l = curMidIndex + 1;
        } else {
          r = curMidIndex - 1;
        }

        if (l === r) {
          if (nums[r] === target) {
            range.r = r;
          }
          break;
        }
      }
    }
  }

  return [range.l, range.r];
}

//#endregion  //*======== 34. 在排序数组中查找元素的第一个和最后一个位置 （https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/） ===========
