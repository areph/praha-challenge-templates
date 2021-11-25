/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isPostalCode } from '../my_functions';
jest.mock('../util/index');

describe('isPostalCodeのテスト', () => {
  test('空文字はfalsy', () => {
    expect(isPostalCode('')).toBeFalsy();
  });
});
