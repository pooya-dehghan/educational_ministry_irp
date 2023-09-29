import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from './RessetPassword.module.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { Container, Link, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from 'react-redux';
import { changePasswordAsync } from '../../features/auth/authThunk';
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

const RessetPassword = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = () => {
    setButtonLoading(true);
    const changePasswordData = {
      username,
      old_password: oldPassword,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    };
    (dispatch as any)(changePasswordAsync(changePasswordData))
      .unwrap()
      .then((response: any) => {
        dispatch(login(response));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'شما با موفقیت رمز خود را تغییر دادید.',
            open: true,
          })
        );
        setButtonLoading(false);
        navigate('/dashboard');
      })
      .catch((error: any) => {
        console.log('error: ', error);
        dispatch(
          updateResponse({
            severity: 'error',
            message:
              'عملیات ناموفق لطفا از صحیح بودن اطلاعات اطمینان حاصل کنید.',
            open: true,
          })
        );
        setButtonLoading(false);
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
                تغییر رمز عبور
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
                  onChange={(e) => setOldPassword(e.target.value)}
                  id="outlined-basic"
                  label="گذرواژه قبلی"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.textAreaContainer}>
                <TextField
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="outlined-basic"
                  label="گذرواژه جدید"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.textAreaContainer}>
                <TextField
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  id="outlined-basic"
                  label="تکرار گذرواژه جدید"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8} className={classes.buttonContainer}>
                <Button
                  onClick={() => handleChangePassword()}
                  variant="contained"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} color="inherit" />{' '}
                      <Typography
                        style={{ fontSize: '13px', marginRight: '8px' }}
                      >
                        در حال تغییر رمز
                      </Typography>
                    </div>
                  ) : (
                    'تغییر رمز'
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="signup">
                  تا به حال ثبت نام نکرده اید ؟ ثبت نام کنید
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default RessetPassword;
