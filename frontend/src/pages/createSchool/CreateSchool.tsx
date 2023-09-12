import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styles from './createSchool.module.css';
import Dashboard from '../Dashboard/Dashboard';
import { Formik, Form, Field, FieldProps } from 'formik';
import { createSchoolAsync } from '../../features/school/schoolThunk';
import { useDispatch } from 'react-redux';
import { createSchool } from '../../features/school/schoolSlice';
import { updateResponse } from '../../features/response/responseSlice';
import { Values } from './interface/formikValues';
import { schoolValidationSchema } from '../../validations/create-school-validation';

const CreateSchool: React.FC = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = (values: Values, setSubmitting: any) => {
    let createSchoolData = {
      name: values.name,
      manager: values.manager,
      address: values.address,
      username: values.username,
      password: values.password,
      password_confirmation: values.password_confirmation,
      region: values.region,
      office_manager: values.office_manager,
      city: values.city,
    };
    (dispatch as any)(createSchoolAsync(createSchoolData))
      .unwrap()
      .then((response: any) => {
        dispatch(createSchool({}));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'مدرسه با موفقیت اضافه شد.',
            open: true,
          })
        );
      })
      .catch((error: any) => {
        console.log('error: ', error);
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
            open: true,
          })
        );
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
                ثبت مدرسه
              </Typography>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  password_confirmation: '',
                  name: '',
                  manager: '',
                  address: '',
                  region: '',
                  office_manager: '',
                  city: '',
                }}
                validationSchema={schoolValidationSchema}
                onSubmit={(values: Values, { setSubmitting }: any) => {
                  handleFormSubmit(values, setSubmitting);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2} dir="rtl">
                      <Grid item xs={12} sm={6}>
                        <Field name="name">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="نام مدرسه"
                              placeholder="نام مدرسه"
                              id="name"
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
                      <Grid item xs={12} sm={6}>
                        <Field name="manager">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="نام مدیر"
                              placeholder="نام مدیر"
                              id="manager"
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
                        <Field name="office_manager">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="شماره مسئول اموزش پرورش"
                              placeholder="شماره مسئول اموزش پرورش"
                              id="office_manager"
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
                              label="تایید گذرواژه"
                              placeholder="تایید گذرواژه"
                              id="password_confirmation"
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
                        <Field name="region">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="منطقه"
                              placeholder="منطقه"
                              id="region"
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
                        <Field name="city">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="شهر"
                              placeholder="شهر"
                              id="city"
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
                        <Field name="address">
                          {({ field, meta }: FieldProps) => (
                            <TextField
                              {...field}
                              label="آدرس"
                              placeholder="آدرس"
                              id="address"
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

export default CreateSchool;
