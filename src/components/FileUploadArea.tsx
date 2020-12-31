import React from 'react';
import img from './image.svg';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Typography } from '@material-ui/core';

const defaultMargin = {
  marginTop: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const useStyles = makeStyles((theme) => ({
  text2: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
  uploadArea: {
    ...defaultMargin,
    width: 500,
    height: 270,
    border: '2px dashed cornflowerblue',
    borderRadius: '8px',
    backgroundColor: '#F0F0F0',
  },
  uploadIcon: {
    width: 184,
    height: 146,
  },
  uploadIconBase: {
    ...defaultMargin,
    width: 184,
    height: 146,
  },
}));

type OnDropHandler = (acceptedFiles: File[]) => void;

const FileUploadArea: React.FC<{
  onDropHandler?: OnDropHandler;
}> = (prop) => {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: prop.onDropHandler,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className={classes.uploadArea} {...getRootProps({})}>
      <input {...getInputProps()} />
      <div className={classes.uploadIconBase}>
        <img alt='upload area' className={classes.uploadIcon} src={img} />
      </div>
      <Typography className={classes.text2}>
        Drag {'&'} Drop your image here
      </Typography>
    </div>
  );
};

export default FileUploadArea;
