import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import SnackBar from '../../components/snackBar/snackBar';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw !important',
  },
  loginHeader: {
    textAlign: 'center',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  textAreaContainer: {
    textAlign: 'center',
  },
});

const Root = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const signupRequest = () => {
    console.log('signup');
    axios
      .post('localhost:8000/user', {
        firstName: username,
        lastName: password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12} className={classes.loginHeader}>
          SIGN UP
        </Grid>
        <Grid item xs={12} className={classes.textAreaContainer}>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.textAreaContainer}>
          <TextField
            dir="rtl"
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="گذرواژه"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.textAreaContainer}>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="outlined-basic"
            label="تکرار گذر واژه"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={8} className={classes.buttonContainer}>
          <Button onClick={() => signupRequest()} variant="contained">
            ثبت نام
          </Button>
        </Grid>
      </Grid>
      <SnackBar
        severity="error"
        message="this is my error"
        handleClose={() => console.log('close me nigger')}
        open={true}
      />
    </>
  );
};

export default Root;
