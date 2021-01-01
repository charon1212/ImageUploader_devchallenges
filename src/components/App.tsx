import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { uploadFile } from '../app/firebase/uploadFile';
import FileUpload from './FileUpload';
import FileUploadComplete from './FileUploadComplete';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Segoe UI',
  },
});

const App: React.FC = () => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const uploadFileHandler = async (file: File) => {
    setHasUploadedFile(true);
    const fileName = 'testFile.jpg';

    // In order to avoid attacks, upload the file with the same path.
    // By doing so, overwrite the file, and storage capacity does not increase.
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

  return (
    <MuiThemeProvider theme={theme}>
      {hasUploadedFile ? (
        <FileUploadComplete fileUrl={fileUrl} />
      ) : (
        <FileUpload fileUploadHandler={uploadFileHandler} />
      )}
    </MuiThemeProvider>
  );
};

export default App;
