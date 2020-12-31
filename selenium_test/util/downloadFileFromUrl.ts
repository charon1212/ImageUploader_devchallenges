import * as fs from 'fs';
import fetch from 'node-fetch';

/**
 * 指定したURLのリソースをファイルに保存する。
 *
 * @param url ダウンロード元のURL。
 * @param filePath 保存するファイルのファイルパス。
 */
const downloadFileFromUrl = async (url: string, filePath: string) => {
  const fileStream = fs.createWriteStream(filePath);
  await (await fetch(url)).body.pipe(fileStream);
};

export default downloadFileFromUrl;