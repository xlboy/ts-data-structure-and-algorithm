import { expect, test } from "vitest";

function sumOfNumbers(numbers: Array<number>, currentSum = 0): number {
  // 基线条件：数组长度为 1；递归条件：数组长度大于 1
  if (numbers.length === 1) {
    return numbers[0] + currentSum;
  } else {
    return sumOfNumbers(numbers.slice(1), numbers[0] + currentSum);
  }
}

function sum(numbers: Array<number>): number {
  if (numbers.length === 1) {
    return numbers[0];
  } else {
    return numbers[0] + sum(numbers.slice(1));
  }
}

test("sumOfNumbers", () => {
  expect(sumOfNumbers([55, 1, 9, 1, 88, 0])).toBe(154);
});

test("sum", () => {
  expect(sum([55, 1, 9, 1, 88, 0])).toBe(154);
});

function findMaxNumber(numbers: Array<number>, currentMax = 0): number {
  // 基线条件：数组长度为 1；递归条件：数组长度大于 1
  if (numbers.length === 1) {
    return Math.max(numbers[0], currentMax);
  } else {
    return findMaxNumber(numbers.slice(1), Math.max(numbers[0], currentMax));
  }
}

test("findMaxNumber", () => {
  expect(findMaxNumber([55, 1, 9, 1, 88, 0])).toBe(88);
});

function binarySearch(
  numbers: Array<number>,
  target: number,
  left = 0,
  right = numbers.length - 1
): number {
  // 基线条件：left > right
  if (left > right) {
    return -1;
  }

  const middle = Math.floor((left + right) / 2);
  const middleValue = numbers[middle];

  if (middleValue === target) {
    return middle;
  } else if (middleValue > target) {
    return binarySearch(numbers, target, left, middle - 1);
  } else {
    return binarySearch(numbers, target, middle + 1, right);
  }
}

test("binarySearch", () => {
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toBe(2);
});
