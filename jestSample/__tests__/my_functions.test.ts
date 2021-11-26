/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isZipCode } from '../my_functions';
jest.mock('../util/index');

describe('isZipCodeのテスト', () => {
  test('空文字はfalsy', async () => {
    const result = await isZipCode('');
    expect(result).toBeFalsy();
  });
  test('正しい郵便番号フォーマット以外はfalsy', async () => {
    const result = await isZipCode('1234567');
    expect(result).toBeFalsy();
  });
  test('存在しない郵便番号はfalsy', async () => {
    const result = await isZipCode('123-4567');
    expect(result).toBeFalsy();
  });
  test('存在する郵便番号はtrue', async () => {
    const result = await isZipCode('222-0037');
    expect(result).toBeTruthy();
  });
});
