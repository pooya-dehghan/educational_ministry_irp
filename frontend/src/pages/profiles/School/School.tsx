import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './school.module.css';
import { SchoolInterface } from '../../../interfaces/school.interface';
import { useDispatch } from 'react-redux';
import { updateSchool } from '../../../features/school/schoolSlice';
import { updateResponse } from '../../../features/response/responseSlice';
import { updateSchoolAsync } from '../../../features/school/schoolThunk';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginBottom: '3rem', // Add margin here
    fontStyle: 'bold',
  },
  marginTop: {
    marginTop: '2rem',
  },
}));

interface SchoolProfileProps {
  userInfo: SchoolInterface;
  id: number;
}

const SchoolProfile: React.FC<SchoolProfileProps> = ({ userInfo, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleSubmit = (values: any, setSubmitting: any) => {
    setButtonLoading(true);
    let updateSchoolData = {
      username: values.username,
      email: values.email,
      phone_number: values.phone_number,
      name: values.name,
      manager: values.manager,
      teacher: values.teacher,
      region: values.region,
      city: values.city,
      capacity: values.capacity,
      stablished_year: values.stablished_year,
    };
    (dispatch as any)(updateSchoolAsync({ schoolID: id, ...updateSchoolData }))
      .unwrap()
      .then((response: any) => {
        setButtonLoading(false);
        dispatch(updateSchool(response));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'اطلاعات مدرسه با موفقیت بروزرسانی شد',
            open: true,
          })
        );
      })
      .catch((error: any) => {
        setButtonLoading(false);
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
            open: true,
          })
        );
      });
  };
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
        height: '100vh',
      }}
    >
      <Grid container>
        <Grid item>
          <Typography variant="h4" className={classes.marginButton}>
            اطلاعات مدرسه
          </Typography>
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          username: userInfo.username,
          email: userInfo.email,
          phone_number: userInfo.phone_number,
          name: userInfo.name,
          manager: userInfo.manager,
          region: userInfo.region,
          city: userInfo.city,
          officemanager: userInfo.office_manager,
          capacity: userInfo.capacity,
          stablished_year: userInfo.stablished_year,
        }}
        onSubmit={(values: any, { setSubmitting }: any) => {
          handleSubmit(values, setSubmitting);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} dir="rtl">
              <Grid item xs={12} sm={3}>
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="name">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="نام"
                      placeholder="نام"
                      id="name"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="manager">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="نام مدیر"
                      placeholder="نام مدیر "
                      id="manager"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="phone_number">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="تلفن"
                      placeholder="تلفن"
                      id="phone_number"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="ایمیل"
                      placeholder="ایمیل"
                      id="email"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field name="stablished_year">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="سال تاسیس"
                      placeholder="سال تاسیس"
                      id="stablished_year"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="studentNumber">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label=" تعداد دانش آموز"
                      placeholder="تعداد دانش آموز "
                      id="studentNumber"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="capacity">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label=" ظرفیت کارورز"
                      placeholder=" ظرفیت کارورز"
                      id="capacity"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ''}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={buttonLoading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {buttonLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress size={24} color="inherit" />{' '}
                      <Typography
                        style={{ fontSize: '13px', marginRight: '8px' }}
                      >
                        در حال ویرایش
                      </Typography>
                    </div>
                  ) : (
                    'ویرایش'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Grid container>
        <Grid item>
          <Typography variant="h4" className={classes.marginTop}>
            فهرست دانشجویان کارورز
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SchoolProfile;
