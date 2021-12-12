import { storage } from "../firebase";

interface UploadFileArgs {
  file?: File;
  folder?: string;
  progressCallback?: (arg: number) => void;
  errorCallback?: (arg?: string) => void;
}

export const handleFileUpload = ({
  file,
  folder,
  progressCallback,
  errorCallback,
}: UploadFileArgs) =>
  new Promise<string>(
    (resolve, reject) =>
      file &&
      folder &&
      storage
        ?.ref(`${folder}/${file.name}`)
        .put(file)
        .on(
          "state_changed",
          (snapshot) => {
            if (progressCallback) {
              const percent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progressCallback(percent);
            }
          },
          // Error callback
          (error) => {
            if (errorCallback) {
              errorCallback(error.message);
            }
            reject();
          },
          () => {
            storage
              ?.ref(folder)
              .child(file.name)
              .getDownloadURL()
              .then((url: string) => {
                resolve(url);
              })
              .catch(reject);
          }
        )
  );
