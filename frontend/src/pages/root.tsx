import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
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

  const loginRequest = () => {
    console.log('login');
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
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12} className={classes.loginHeader}>
        LOGIN
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
          onChange={(e) => setPassword(e.target.value)}
          id="outlined-basic"
          label="گذرواژه"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={8} className={classes.buttonContainer}>
        <Button onClick={() => loginRequest()} variant="contained">
          ورود
        </Button>
      </Grid>
    </Grid>
  );
};

export default Root;
