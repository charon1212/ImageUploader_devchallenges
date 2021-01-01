import React from 'react';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    height: theme.spacing(7),
  },
  button: {
    height: theme.spacing(6),
    borderRadius:theme.spacing(2)
  },
}));

type Props = {
  labelText?: string;
  buttonPosition: 'start' | 'end';
  buttonText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const InButtonInput: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <OutlinedInput
      id='imageLinkUrl'
      className={classes.input}
      readOnly={true}
      value={props.labelText}
      endAdornment={
        <InputAdornment position={props.buttonPosition}>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            size='large'
            onClick={props.onClick}
          >
            {props.buttonText}
          </Button>
        </InputAdornment>
      }
    />
  );
};

export default InButtonInput;
