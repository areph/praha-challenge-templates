import { mocked  } from 'ts-jest/utils';
import { sumOfArray, asyncSumOfArray, asyncSumOfArraySometimesZero } from '../functions'
import { DatabaseMock } from "../util/index";
jest.mock('../util/index');

describe('sumOfArrayのテスト', () => {
  test('1つしか値がない場合はその値を返す', () => {
    expect(sumOfArray([100])).toBe(100);
  })
  test('2つの値がある場合はその合計値を返す', () => {
    expect(sumOfArray([100, 200])).toBe(300);
  })
  test('3つの値がある場合はその合計値を返す', () => {
    expect(sumOfArray([100, 200, 500])).toBe(800);
  })
  test('負数があっても合計値を返す', () => {
    expect(sumOfArray([100, -200, 500])).toBe(400);
  })
  test('浮動小数点があっても合計値を返す', () => {
    expect(sumOfArray([0.1, 0.2])).toBeCloseTo(0.3);
  })
  test.skip('空の配列を渡した場合は例外を返す', () => {
    // TODO: TypeErrorを検知するテストが書けない
    expect(sumOfArray([])).toThrow();
  })
})

describe('asyncSumOfArrayのテスト', () => {
  test('1つしか値がない場合はその値を返す', async () => {
    await expect(asyncSumOfArray([100])).resolves.toBe(100);
  })
})

describe('asyncSumOfArraySometimesZeroのテスト', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // mocked(DatabaseMock).mockClear();
  });

  test('エラーが発生しなければ引数に渡した合計値を返す', async () => {
    expect(DatabaseMock).not.toHaveBeenCalled();
    for (let i = 0; i < 100; i++) {
      // NOTE: saveではランダムでエラーが発生するのをmockできているか検証する
      await expect(asyncSumOfArraySometimesZero([100])).resolves.toBe(100);
    }
    expect(DatabaseMock).toHaveBeenCalledTimes(100);
  })
})
