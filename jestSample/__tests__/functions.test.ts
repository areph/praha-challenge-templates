/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { mocked } from 'ts-jest/utils';
import { sumOfArray, asyncSumOfArray, asyncSumOfArraySometimesZero, getFirstNameThrowIfLong } from '../functions';
import { DatabaseMock } from '../util/index';
import { NameApiService } from '../nameApiService';
jest.mock('../util/index');

describe('sumOfArrayのテスト', () => {
  test('1つしか値がない場合はその値を返す', () => {
    expect(sumOfArray([100])).toBe(100);
  });
  test('2つの値がある場合はその合計値を返す', () => {
    expect(sumOfArray([100, 200])).toBe(300);
  });
  test('3つの値がある場合はその合計値を返す', () => {
    expect(sumOfArray([100, 200, 500])).toBe(800);
  });
  test('負数があっても合計値を返す', () => {
    expect(sumOfArray([100, -200, 500])).toBe(400);
  });
  test('浮動小数点があっても合計値を返す', () => {
    expect(sumOfArray([0.1, 0.2])).toBeCloseTo(0.3);
  });
  // test('空の配列を渡した場合は例外を返す', () => {
  //   expect(() => sumOfArray([])).toThrow();
  // });
  test('空の配列を渡した場合は0を返す', () => {
    expect(sumOfArray([])).toBe(0);
  });
});

describe('asyncSumOfArrayのテスト', () => {
  test('1つしか値がない場合はその値を返す', async () => {
    await expect(asyncSumOfArray([100])).resolves.toBe(100);
  });
});

describe('asyncSumOfArraySometimesZeroのテスト', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mocked(DatabaseMock).mockClear();
  });

  test('エラーが発生しなければ引数に渡した合計値を返す', async () => {
    expect(DatabaseMock).not.toHaveBeenCalled();
    for (let i = 0; i < 100; i++) {
      // NOTE: saveではランダムでエラーが発生するのをmockできているか検証する
      await expect(asyncSumOfArraySometimesZero([100])).resolves.toBe(100);
    }
    expect(DatabaseMock).toHaveBeenCalledTimes(100);
  });

  test('エラーが発生した場合は0を返す', async () => {
    // NOTE: Mockでエラーをthrowさせる
    mocked(DatabaseMock).mockImplementation(() => {
      return {
        save: () => {
          throw new Error('throw-mock');
        },
      };
    });
    expect(DatabaseMock).not.toHaveBeenCalled();
    await expect(asyncSumOfArraySometimesZero([100])).resolves.toBe(0);
    expect(DatabaseMock).toHaveBeenCalledTimes(1);
  });
});

describe('getFirstNameThrowIfLongのテスト', () => {
  test('指定した引数の数字が文字列長より小さければその文字列を返す', async () => {
    jest.spyOn(NameApiService.prototype, 'getFirstName').mockReturnValue(Promise.resolve('mockmock'));
    await expect(getFirstNameThrowIfLong(10)).resolves.toBe('mockmock');
  });
  test('指定した引数の数字が文字列長より大きければ例外を返す', async () => {
    jest.spyOn(NameApiService.prototype, 'getFirstName').mockReturnValue(Promise.resolve('mockmock'));
    await expect(getFirstNameThrowIfLong(1)).rejects.toThrow(new Error('first_name too long'));
  });
});
