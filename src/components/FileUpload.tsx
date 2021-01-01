import React, { useCallback } from 'react';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import FileUploadArea from './FileUploadArea';

const defaultMargin = {
  marginTop: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const useStyles = makeStyles((theme) => ({
  base: {
    ...defaultMargin,
    width: 600,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
  text2: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    ...defaultMargin,
    marginBottom: 20,
    textTransform: 'none',
  },
}));

type FileUploadHandler = (file: File) => Promise<void>;

const FileUpload: React.FC<{
  fileUploadHandler: FileUploadHandler;
}> = (prop) => {
  const classes = useStyles();
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles[0]) {
      await prop.fileUploadHandler(acceptedFiles[0]);
    }
  }, [prop]);
  const onFileUploadedByButtonClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files![0]) {
      await prop.fileUploadHandler(e.target.files![0]);
    }
  };

  return (
    <div>
      <Paper className={classes.base}>
        <Typography className={classes.text} variant='h4'>
          Upload your image
        </Typography>
        <Typography className={classes.text}>
          File should be Jpeg, Png, ...
        </Typography>
        <FileUploadArea onDropHandler={onDrop}/>
        <Typography className={classes.text2}>Or</Typography>
        <Box textAlign='center'>
          <Button
            className={classes.button}
            variant='contained'
            component='label'
            color='primary'
          >
            <input id='uploadFileInput' type='file' hidden onChange={onFileUploadedByButtonClick} />
            Choose a file
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default FileUpload;
