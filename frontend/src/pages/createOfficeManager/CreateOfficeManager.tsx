import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dashboard from '../Dashboard/Dashboard';
import { Formik, Form, Field, FieldProps } from 'formik';
import { createOfficeManagerAsync } from '../../features/officemanager/officemanagerThunk';
import { useDispatch } from 'react-redux';
import { createOfficeManager } from '../../features/officemanager/officemanagerSlice';
import { updateResponse } from '../../features/response/responseSlice';
import { Values } from './interface';
import { officeManagerValidationSchema } from '../../validations';

const CreateOfficeManager: React.FC = () => {
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const handleSubmit = (values: Values, setSubmitting: any, resetForm: any) => {
    setButtonLoading(true);
    let createOfficeManagerData = {
      region: values.region,
      password: values.password,
      password_confirmation: values.password_confirmation,
      username: values.username,
      email : values.email
    };
    (dispatch as any)(createOfficeManagerAsync(createOfficeManagerData))
      .unwrap()
      .then((response: any) => {
        dispatch(createOfficeManager({}));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'مسئول مربوطه با موفقیت اضافه شد.',
            open: true,
          })
        );
        resetForm();
        setButtonLoading(false);
      })
      .catch((error: any) => {
        console.log('error123321: ', error);
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
        <div dir="rtl">
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
                  password: '',
                  password_confirmation: '',
                  username: '',
                }}
                validationSchema={officeManagerValidationSchema} // Add validation schema
                onSubmit={(
                  values: Values,
                  { setSubmitting, resetForm }: any
                ) => {
                  handleSubmit(values, setSubmitting, resetForm);
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
                                  ? errors.username
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
                        <Box sx={{ minWidth: 120 }}>
                          <Field name="region">
                            {({ field, meta }: FieldProps) => (
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  منطقه
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  //value={age}
                                  label="Age"
                                  {...field}
                                >
                                  <MenuItem value={1}>منطقه 1</MenuItem>
                                  <MenuItem value={2}>منطقه 2</MenuItem>
                                  <MenuItem value={3}>منطقه 3</MenuItem>
                                  <MenuItem value={4}>منطقه 4</MenuItem>
                                  <MenuItem value={5}>منطقه 5</MenuItem>
                                  <MenuItem value={6}>منطقه 6</MenuItem>
                                  <MenuItem value={7}>منطقه 7</MenuItem>
                                  <MenuItem value={8}>منطقه 8</MenuItem>
                                  <MenuItem value={9}>منطقه 9</MenuItem>
                                  <MenuItem value={10}>منطقه 10</MenuItem>
                                  <MenuItem value={11}>منطقه 11</MenuItem>
                                  <MenuItem value={12}>منطقه 12</MenuItem>
                                  <MenuItem value={13}>منطقه 13</MenuItem>
                                  <MenuItem value={14}>منطقه 14</MenuItem>
                                  <MenuItem value={15}>منطقه 15</MenuItem>
                                  <MenuItem value={16}>منطقه 16</MenuItem>
                                  <MenuItem value={17}>منطقه 17</MenuItem>
                                  <MenuItem value={18}>منطقه 18</MenuItem>
                                  <MenuItem value={19}>منطقه 19</MenuItem>
                                  <MenuItem value={20}>منطقه 20</MenuItem>
                                  <MenuItem value={21}>منطقه 21</MenuItem>
                                  <MenuItem value={22}>منطقه 22</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          </Field>
                        </Box>
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

export default CreateOfficeManager;
