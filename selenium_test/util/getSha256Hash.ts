import fs from 'fs';
import crypto from 'crypto';

/**
 * 指定したファイルのSha256ハッシュを取得する。
 * @param filePath ファイルの絶対パス
 */
const getSha256Hash = (filePath: string) => {
  const buf = fs.readFileSync(filePath);
  const hashHex = crypto.createHash('sha256').update(buf.toString(), 'utf8').digest('hex');
  return hashHex;
}

export default getSha256Hash;