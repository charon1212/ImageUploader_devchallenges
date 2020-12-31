import React from 'react';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  LinearProgress,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    marginTop: 40,
  },
  button: {
    ...defaultMargin,
    marginBottom: 40,
    textTransform: 'none',
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
  return prop.fileUrl === '' ? (
    <>
      <Paper className={classes.progressPage}>
        <div className={classes.progressDiv}>
          <Typography id='labelUploading' className={classes.text}>Uploading...</Typography>
          <LinearProgress className={classes.progressBar} />
        </div>
      </Paper>
    </>
  ) : (
    <>
      <Paper className={classes.base}>
        <Box display='flex' justifyContent='center'>
          <CheckCircleIcon fontSize='large' style={{ color: 'green' }} />
        </Box>
        <Typography id='labelUploadSuccessed' className={classes.text}>Uploaded Successfully!</Typography>
        <img
          src={prop.fileUrl}
          style={{ width: 550, marginRight: '25px', marginLeft: '25px' }}
          alt='アップロードした画像'
        />
        <FormControl fullWidth>
          <OutlinedInput
            id='imageLinkUrl'
            readOnly={true}
            value={prop.fileUrl}
            endAdornment={
              <InputAdornment position='end'>
                <Button variant='contained' color='primary' size='large'>
                  aaa
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </Paper>
    </>
  );
};

export default FileUploadComplete;
