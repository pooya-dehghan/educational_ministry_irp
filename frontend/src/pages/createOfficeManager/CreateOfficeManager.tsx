import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './createOM.module.css';
import Dashboard from '../Dashboard/Dashboard';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import { useTextFieldStyles } from '../../hooks/TextFieldStyle/TextFieldStyle'; // Update the path
import { createOfficeManagerAsync } from '../../features/officemanager/officemanagerThunk';
import { useDispatch } from 'react-redux';
import { createOfficeManager } from '../../features/officemanager/officemanagerSlice';
import { updateResponse } from '../../features/response/responseSlice';
import { Values } from './interface';
import { officeManagerValidationSchema } from '../../validations';
const theme = createTheme();

const CreateOfficeManager: React.FC = () => {
  const classes = useTextFieldStyles();
  const [firstName, setFirstName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (values: Values, setSubmitting: any) => {
    let createOfficeManagerData = {
      firstname: firstName,
    };
    console.log('values: ', values);
    (dispatch as any)(createOfficeManagerAsync(createOfficeManagerData))
      .unwrap()
      .then((response: any) => {
        dispatch(createOfficeManager({}));
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
    setSubmitting(false);
  };

  return (
    <>
      <Dashboard>
        <div className={styles.container}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                backgroundColor: 'white',
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h3"
                variant="subtitle1"
                sx={{ fontSize: '1rem' }}
              >
                ثبت مسئول اداره آموزش و پرورش
              </Typography>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  region: '',
                  nationalCode: '',
                  email: '',
                }}
                onSubmit={(values: Values, { setSubmitting }: any) => {
                  handleSubmit(values, setSubmitting);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2} dir="rtl">
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          name="firstName"
                          label="نام"
                          placeholder="نام"
                          id="firstName"
                          autoFocus
                          onChange={(e: any) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          name="lastName"
                          label="نام خانوادگی"
                          placeholder="نام خانوادگی"
                          id="lastName"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          name="region"
                          label="منطقه"
                          placeholder="منطقه"
                          id="region"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          component={TextField}
                          name="region"
                          label="کد ملی"
                          placeholder="کد ملی"
                          id="nationalCode"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="email">
                          {({ field }: FieldProps) => (
                            <TextField
                              {...field}
                              label="ایمیل"
                              placeholder="ایمیل"
                              id="nationalCode"
                              autoFocus
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        </Field>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      ثبت
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Container>
        </div>
      </Dashboard>
    </>
  );
};

export default CreateOfficeManager;
