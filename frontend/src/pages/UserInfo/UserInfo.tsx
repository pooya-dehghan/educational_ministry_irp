import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dashboard from '../Dashboard/Dashboard';

const UserInfo = ({ info = {} }) => {
  const handleSubmit = (values: any, setSubmitting: any) => {
    let createTeacherData = {
      schoolName: values.schoolName,
      managerName: values.managerName,
      password: values.password,
      password_confirmation: values.password_confirmation,
      username: values.username,
      field: values.field,
    };
  };
  return (
    <>
      <Dashboard>
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
            <Grid item >
              <Typography>اطلاعات کاربر</Typography>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              schoolName: '',
              managerName: '',
              nationalCode: '',
              email: '',
              password: '',
              password_confirmation: '',
              username: '',
              field: '',
            }}
            onSubmit={(values: any, { setSubmitting }: any) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2} dir="rtl">
                  <Grid item xs={12} sm={4}>
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
                            touched.firstName && errors.firstName ? true : false
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={6} sm={4}>
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
                  <Grid item xs={6} sm={4}>
                    <Field name="field">
                      {({ field, meta }: FieldProps) => (
                        <TextField
                          {...field}
                          label="رشته"
                          placeholder="رشته"
                          id="field"
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
                  <Grid item xs={12} sm={4}>
                    <Field name="managerName">
                      {({ field, meta }: FieldProps) => (
                        <TextField
                          {...field}
                          label="نام مدیر"
                          placeholder="نام مدیر"
                          id="managerName"
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
                  <Grid item xs={12} sm={4}>
                    <Field name="schoolName">
                      {({ field, meta }: FieldProps) => (
                        <TextField
                          {...field}
                          label="نام مدرسه"
                          placeholder="نام مدرسه"
                          id="schoolName"
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={4}>
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
                </Grid>
                <Grid container>
                  <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      ثبت
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Dashboard>
    </>
  );
};

export default UserInfo;
