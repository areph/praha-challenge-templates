import { sumOfArray } from '../functions'

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
})
