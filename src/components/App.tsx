import React, { useState } from 'react';
import { uploadFile } from '../app/firebase/uploadFile';
import FileUpload from './FileUpload';
import FileUploadComplete from './FileUploadComplete';

const App: React.FC = () => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const uploadFileHandler = async (file: File) => {
    setHasUploadedFile(true);
    const fileName = 'testFile.jpg';
    await uploadFile(
      `images/${fileName}`,
      file,
      (url) => {
        setFileUrl(url);
      },
      (err) => {
        alert(err.message);
        setHasUploadedFile(false);
      }
    );
  };

  return hasUploadedFile ? (
    <FileUploadComplete fileUrl={fileUrl} />
  ) : (
    <FileUpload fileUploadHandler={uploadFileHandler} />
  );
};

export default App;
