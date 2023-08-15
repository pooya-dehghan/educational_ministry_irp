import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from './login.module.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { Container, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../../features/auth/authThunk';
import { login } from '../../features/auth/authSlice';
import { updateResponse } from '../../features/response/responseSlice';
import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../utils/token/index';

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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const loginData = {
      username,
      password,
    };
    (dispatch as any)(loginAsync(loginData))
      .unwrap()
      .then((response: any) => {
        dispatch(login(response));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'شما با موفقیت وارد سامانه جامع شدید.',
            open: true,
          })
        );
        tokenHandler.setToken(response.token);
        navigate('/dashboard');
      })
      .catch((error: any) => {
        console.log('error: ', error);
        dispatch(
          updateResponse({
            severity: 'error',
            message:
              'عملیات ناموفق لطفا نام کاربری و رمز عبور صحیح را وارد نمایید.',
            open: true,
          })
        );
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
  );
};

export default Login;
