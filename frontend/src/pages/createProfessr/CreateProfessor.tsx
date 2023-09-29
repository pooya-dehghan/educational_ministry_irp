import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dashboard from '../Dashboard/Dashboard';
import { Formik, Form, Field, FieldProps } from 'formik';
import { createProfessorAsync } from '../../features/professor/professorThunk';
import { useDispatch } from 'react-redux';
import { createProfessor } from '../../features/professor/professorSlice';
import { updateResponse } from '../../features/response/responseSlice';
import { Values } from './interface';
import { professorValidationSchema } from '../../validations/create-professor-validation';

const CreateProfessor: React.FC = () => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleSubmit = (values: Values, setSubmitting: any) => {
    setButtonLoading(true);
    let createProfessorData = {
      professor_id: values.professor_id,
      password: values.password,
      password_confirmation: values.password_confirmation,
      username: values.username,
    };
    (dispatch as any)(createProfessorAsync(createProfessorData))
      .unwrap()
      .then((response: any) => {
        dispatch(createProfessor({}));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'استاد با موفقیت اضافه شد.',
            open: true,
          })
        );
        setButtonLoading(false);
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
            open: true,
          })
        );
        setButtonLoading(false);
      });
    setSubmitting(false);
  };

  return (
    <>
      <Dashboard>
        <div>
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
                ثبت استاد
              </Typography>

              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  professor_id: '',
                  nationalCode: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
                  username: '',
                }}
                validationSchema={professorValidationSchema} // Add validation schema
                onSubmit={(values: Values, { setSubmitting }: any) => {
                  handleSubmit(values, setSubmitting);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2} dir="rtl">
                      <Grid item xs={12} sm={6}>
                        <Field name="firstName">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="نام"
                              placeholder="نام"
                              id="firstName"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={
                                touched.firstName && errors.firstName
                                  ? true
                                  : false
                              }
                              helperText={
                                touched.firstName && errors.firstName
                                  ? errors.firstName
                                  : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field name="lastName">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="نام خانوادگی"
                              placeholder="نام خانوادگی"
                              id="lastName"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field name="professor_id">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="شماره استادی"
                              placeholder="شماره استادی"
                              id="professor_id"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field name="nationalCode">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="کد ملی"
                              placeholder="کد ملی"
                              id="nationalCode"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="email">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="ایمیل"
                              placeholder="ایمیل"
                              id="nationalCode"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="password">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="گذرواژه"
                              placeholder="گذرواژه"
                              id="password"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="password_confirmation">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="تکرار گذرواژه"
                              placeholder="تکرار گذرواژه"
                              id="nationalCode"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12}>
                        <Field name="username">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="نام کاربری"
                              placeholder="نام کاربری"
                              id="username"
                              autoFocus
                              variant="outlined"
                              fullWidth
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched && meta.error ? meta.error : ''
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                    </Grid>
                    <Button
                      onClick={() => handleSubmit()}
                      variant="contained"
                      disabled={buttonLoading}
                      type="submit"
                      fullWidth
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {buttonLoading ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CircularProgress size={24} color="inherit" />{' '}
                          <Typography
                            style={{ fontSize: '13px', marginRight: '8px' }}
                          >
                            در حال ثبت
                          </Typography>
                        </div>
                      ) : (
                        'ثبت'
                      )}
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

export default CreateProfessor;
