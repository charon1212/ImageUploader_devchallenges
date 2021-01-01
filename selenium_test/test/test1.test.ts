import getDriver from '../selenium/driver';
import * as fs from 'fs';
import { WebDriver, until } from 'selenium-webdriver';
import { resolve } from 'path';
import downloadFileFromUrl from '../util/downloadFileFromUrl';
import getSha256Hash from '../util/getSha256Hash';

describe('test1', () => {
  let driver: WebDriver;
  let config: any;
  beforeEach(async () => {
    driver = await getDriver();
    config = JSON.parse(fs.readFileSync('./selenium_test/test/seleniumTestConfig.json', 'utf8'));
  });
  afterEach(async () => {
    driver && await driver.quit();
    const deleteTargetFilePathList = ['./selenium_test/test/tempImage.png'];
    for (let deleteTargetFilePath of deleteTargetFilePathList) {
      const fileFullPath = resolve(deleteTargetFilePath);
      // ファイルがない場合も実行し、その場合はエラーログを出力する。
      fs.unlink(fileFullPath, (err) => {
        console.error('事後処理でファイルが削除できませんでした。\r\nファイルが存在しない可能性もあります。');
        console.error(err);
      });
    }
  });

  it('ボタンからアップロード', async () => {

    // 画面にアクセス
    await driver.get(config.accessUrl);

    // ボタンからアップロード
    const fileInputElement = await driver.findElement({ id: 'uploadFileInput' });
    const fileFullPath = resolve('./selenium_test/test/sampleImage.png');
    await fileInputElement.sendKeys(fileFullPath);

    // アップロード中の画面が表示されることを確認。(5000ms以内に現れない場合テスト失敗)
    await driver.wait(until.elementLocated({ id: 'labelUploading' }), 5000)
      .catch((err) => {
        console.error(err);
        fail('アップロード中ダイアログ画面に遷移しない')
      });

    // アップロード完了画面が表示されるまで待機。
    await driver.wait(until.elementLocated({ id: 'labelUploadSuccessed' }), 10000)
      .catch((err) => {
        console.error(err);
        fail('アップロード完了画面に遷移しない')
      });

    // ラベルの文字列を取得
    const imageLinkUrlInputElement = await driver.wait(until.elementLocated({ id: 'imageLinkUrl' }));
    const imageLinkUrl = await imageLinkUrlInputElement.getAttribute('value');

    // いったんtest配下にファイルをダウンロード
    const tempImageFilePath = resolve('./selenium_test/test/tempImage.png');
    await downloadFileFromUrl(imageLinkUrl, tempImageFilePath);

    // しばらくおかないとダウンロード中のファイルのハッシュを取得してしまうので、3秒ウェイト。
    // 時間が適切かは分からない。
    await driver.sleep(3000);

    // ハッシュ値で比較。
    const uploadFileHash = getSha256Hash(fileFullPath);
    const downloadFileHash = getSha256Hash(tempImageFilePath);
    expect(downloadFileHash).toBe(uploadFileHash);

  }, 60000)
});