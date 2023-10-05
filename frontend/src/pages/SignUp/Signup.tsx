import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { Container, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAsync } from '../../features/signup/signUpThunk';
import { signup } from '../../features/signup/signUpSlice';
import { login } from '../../features/auth/authSlice';
import { RootState } from '../../store/store'; // Make sure to provide the correct path
import { updateResponse } from '../../features/response/responseSlice';
import { useNavigate } from 'react-router-dom';
import * as tokenHandler from '../../utils/token/index';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { getAllProfessorsAsync } from '../../features/professor/professorThunk';
import * as userInfoLocalStorage from '../../utils/storageUser/index';
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLink: {
    textAlign: 'center',
  },
  selectContainer: {
    width: '212px',
    textAlign: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    width: '100%',
  },
});

type Professor = {
  id: number;
  username: string;
  national_code: string;
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  birthday_date: Date;
  gender: string;
  is_active: boolean;
  created_date: Date;
  updated_date: Date;
  avatar: string;
  is_admin: boolean;
  personal_code: string;
  professor_id: string;
  is_science_committee: boolean;
};

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.signup.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.signup.user);
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [professors, setProfessors] = useState([]);
  const [professor_id, setProfessor_id] = useState('0');
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  useEffect(() => {
    (dispatch as any)(getAllProfessorsAsync())
      .unwrap()
      .then((response: any) => {
        setProfessors(response);
      })
      .catch((error: any) => {});
  }, []);
  const handleSignUp = () => {
    setButtonLoading(true);
    const signUpData = {
      username,
      password,
      password_confirmation,
      studentUniqueCode: studentNumber,
      professor2: professor_id,
    };

    (dispatch as any)(signUpAsync(signUpData))
      .unwrap()
      .then((response: any) => {
        dispatch(login(response));
        dispatch(signup(response));
        setButtonLoading(false);
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'شما با موفقیت در سامانه ثبت نام کردید.',
            open: true,
          })
        );
        tokenHandler.setToken(response.access);
        tokenHandler.setRefreshToken(response.refresh);
        userInfoLocalStorage.setUserInfo(response);
        setButtonLoading(false);
        navigate('/dashboard');
      })
      .catch((error: any) => {
        setButtonLoading(false);
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
                ساخت حساب کاربری
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
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  id="outlined-basic"
                  label="تکرار گذر واژه"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={classes.textAreaContainer}>
                <TextField
                  onChange={(e) => setStudentNumber(e.target.value)}
                  id="outlined-basic"
                  label="شماره دانشجویی"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} lg={12} className={classes.textAreaContainer}>
                <FormControl fullWidth className={styles.selectContainer}>
                  {/* <InputLabel
                    className={styles.labelContainer}
                    id="professor_id_provider"
                  >
                    استاد
                  </InputLabel> */}
                  <Typography>استاد را انتخاب کنید</Typography>
                  <Select
                    labelId="professor_id_provider"
                    id="demo-simple-select"
                    value={professor_id}
                    label="استاد"
                    onChange={(value) => setProfessor_id(value.target.value)}
                    className={classes.selectContainer}
                  >
                    {professors.length >= 1 ? (
                      professors.map((professor: Professor) => {
                        return (
                          <MenuItem value={professor.id}>
                            {professor.username}
                          </MenuItem>
                        );
                      })
                    ) : (
                      <MenuItem>در حال گرفتن لیست</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} className={classes.buttonContainer}>
                <Button
                  onClick={() => handleSignUp()}
                  variant="contained"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} color="inherit" />{' '}
                      <Typography
                        style={{ fontSize: '13px', marginRight: '8px' }}
                      >
                        در حال ثبت نام
                      </Typography>
                    </div>
                  ) : (
                    'ثبت نام'
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="login">قبلا ثبت نام نموداه‌اید؟ وارد شوید</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Root;
