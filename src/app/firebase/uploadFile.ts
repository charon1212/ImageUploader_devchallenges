import firebase from "firebase/app";
import { storage } from "./firebase";

/**
 * firebase.strageにファイルをアップロードする。
 * 
 * @param path アップロードするファイルのパス
 * @param file アップロードするファイルのデータ
 * @param onCompleted アップロード完了時の処理
 * @param onError アップロードでエラーが発生した場合の処理
 */
export const uploadFile = async (path: string, file: File, onCompleted: (url: string) => any, onError?: (err: any) => any) => {
  await storage
    .ref(path)
    .put(file)
    .on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      undefined,
      (err) => {
        if (onError !== undefined) {
          onError(err);
        }
      },
      async () => {
        await storage
          .ref(path)
          .getDownloadURL()
          .then(async (url) => {
            await onCompleted(url);
          });
      }
    );
}