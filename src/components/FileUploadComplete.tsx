import React, { useState } from 'react';
import {
  Box,
  FormControl,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InButtonInput from './InButtonInput';
import copy from 'copy-to-clipboard';

const defaultMargin = {
  marginTop: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const useStyles = makeStyles((theme) => ({
  base: {
    ...defaultMargin,
    width: 600,
    paddingTop: 1,
    paddingBottom: 1,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    ...defaultMargin,
    marginBottom: 40,
    textTransform: 'none',
  },
  box: {
    marginTop: 20,
  },
  img: {
    border: '1px solid',
  },
  formControl: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  progressPage: {
    ...defaultMargin,
    marginTop: 200,
    width: 600,
    height: 100,
  },
  progressDiv: {
    paddingTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  progressBar: {
    marginTop: 10,
  },
}));

const FileUploadComplete: React.FC<{ fileUrl: string }> = (prop) => {
  const classes = useStyles();
  const [hasCopiedLink, setHasCopiedLink] = useState(false);
  return prop.fileUrl === '' ? (
    <>
      <Paper className={classes.progressPage}>
        <div className={classes.progressDiv}>
          <Typography id='labelUploading' className={classes.text}>
            Uploading...
          </Typography>
          <LinearProgress className={classes.progressBar} />
        </div>
      </Paper>
    </>
  ) : (
    <>
      <Paper className={classes.base}>
        <Box className={classes.box} display='flex' justifyContent='center'>
          <CheckCircleIcon fontSize='large' style={{ color: 'green' }} />
        </Box>
        <Typography id='labelUploadSuccessed' className={classes.text}>
          Uploaded Successfully!
        </Typography>
        <img
          className={classes.img}
          src={prop.fileUrl}
          style={{
            width: 550,
            marginTop: '20px',
            marginRight: '25px',
            marginLeft: '25px',
          }}
          alt='アップロードした画像'
        />
        <div className={classes.formControl}>
          <FormControl fullWidth>
            <InButtonInput
              labelText={prop.fileUrl}
              buttonPosition='end'
              buttonText={hasCopiedLink ? 'Copied !' : 'Copy Link'}
              onClick={() => {
                copy(prop.fileUrl);
                setHasCopiedLink(true);
              }}
            />
          </FormControl>
        </div>
      </Paper>
    </>
  );
};

export default FileUploadComplete;
