import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { forgotPasswordAsync } from '../../features/auth/authThunk';
import { useDispatch } from 'react-redux';
import { updateResponse } from '../../features/response/responseSlice';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Link, Typography } from '@mui/material';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://s8.uupload.ir/files/signupbg_bdw.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
});

const ForgetPassword: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = () => {
    setButtonLoading(true);
    const forgotData = {
      email: email,
    };
    (dispatch as any)(forgotPasswordAsync(forgotData))
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'لطفا ایمیل خود را چک بکنین.',
            open: true,
          })
        );
        setButtonLoading(false);
        navigate('/login');
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'اطلاعات غلط است.',
            open: true,
          })
        );
        setButtonLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 3,
          marginTop: '100px',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          background:
            'linear-gradient(90deg, rgba(150,200,255 ,1) 0%, rgba(57,75,180,1) 0%, rgba(130,204,219,1) 17%)',
        }}
      >
        <h2>بازیابی رمز عبور</h2>
        <TextField
          label="ایمیل"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          placeholder="ایمیل خود را وارد کنید"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
          onClick={handleForgotPassword}
        >
          {buttonLoading ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={24} color="inherit" />{' '}
              <Typography style={{ fontSize: '13px', marginRight: '8px' }}>
                در حال بررسی
              </Typography>
            </div>
          ) : (
            'بازنشانی رمز عبور'
          )}
        </Button>
      </Box>
    </div>
  );
};

export default ForgetPassword;
