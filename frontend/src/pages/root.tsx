import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from './login.module.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { Container, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../features/auth/authThunk';
import { login } from '../features/auth/authSlice';

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
  loginLink: {
    textAlign: 'center',
  },
});

const Root = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const dispatch = useDispatch();

  const handleLogin = () => {
    const loginData = {
      username,
      password,
    };
    (dispatch as any)(loginAsync(loginData))
      .unwrap()
      .then((response: any) => {
        console.log('response: ', response);
        // You can handle success here, e.g. redirect or show a success message
        dispatch(login(response.user)); // Dispatch your signup action to update the state
      })
      .catch((error: any) => {
        // Handle errors, e.g. show an error message
      });
  };
  return (
    <>
      <div className={styles.container}>
        <Container
          component="main"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: isSmallScreen ? '300px' : '500px',
              justifyContent: 'center',
            }}
            className={styles.box}
          >
            <Grid container spacing={2} className={classes.container}>
              <Grid item xs={12} className={classes.loginHeader}>
                ورود
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
                <Button onClick={() => handleLogin()} variant="contained">
                  ورود
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="#">تا به حال ثبت نام نکرده اید ؟ ثبت نام کنید</Link>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="#">رمز عبور خود را فراموش کرده اید؟</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>

    // <Grid container spacing={2} className={classes.container}>
    //   <Grid item xs={12} className={classes.loginHeader}>
    //     LOGIN
    //   </Grid>
    //   <Grid item xs={12} className={classes.textAreaContainer}>
    //     <TextField
    //       onChange={(e) => setUsername(e.target.value)}
    //       id="outlined-basic"
    //       label="نام کاربری"
    //       variant="outlined"
    //     />
    //   </Grid>
    //   <Grid item xs={12} className={classes.textAreaContainer}>
    //     <TextField
    //       onChange={(e) => setPassword(e.target.value)}
    //       id="outlined-basic"
    //       label="گذرواژه"
    //       variant="outlined"
    //     />
    //   </Grid>
    //   <Grid item xs={8} className={classes.buttonContainer}>
    //     <Button onClick={() => loginRequest()} variant="contained">
    //       ورود
    //     </Button>
    //   </Grid>
    // </Grid>
  );
};

export default Root;
