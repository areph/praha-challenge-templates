import axios from 'axios';

export const isZipCode = async (zipCode: string): Promise<boolean> => {
  // NOTE: 外部のAPIをコールするため事前に入力形式が正しいかチェックする
  // NOTE: 存在しない郵便コードが入力された場合はfalseを返却
  if (!/\d{3}-\d{4}/.test(zipCode)) {
    return false;
  }
  const { data } = await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`);

  const results = data.results;

  return results != null && results.length != 0;
};

const fortune: { [key: number]: string } = {};
fortune[0] = '大吉';
fortune[1] = '吉';
fortune[2] = '中吉';
fortune[3] = '凶';
export const printFortune = () => {
  console.log(fortune[Math.floor(Math.random() * 4)]);
};
