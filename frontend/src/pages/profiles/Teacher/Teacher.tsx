import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./teacher.module.css";
import { TeacherInterface } from "../../../interfaces/teacher.interface";
import { useDispatch } from "react-redux";
import { updateTeacher } from "../../../features/teacher/teacherSlice";
import { updateResponse } from "../../../features/response/responseSlice";
import { updateTeacherAsync } from "../../../features/teacher/teacherThunk";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginBottom: "3rem", // Add margin here
    fontStyle: "bold",
  },
}));

interface TeacherProfileProps {
  userInfo: TeacherInterface;
  id: number;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ userInfo, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (values: any, setSubmitting: any) => {
    let updateTeacherData = {
      username: values.username,
      national_code: values.national_code,
      phone_number: values.phone_number,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      school_name: values.school_name,
      birthday_date: values.birthday_date,
      gender: values.gender,
      personal_code: values.personal_code,
    };
    (dispatch as any)(updateTeacherAsync({ id: id, ...updateTeacherData }))
      .unwrap()
      .then((response: any) => {
        dispatch(updateTeacher(response));
        dispatch(
          updateResponse({
            severity: "success",
            message: "پروفایل شما با موفقیت بروزرسانی شد..",
            open: true,
          })
        );
      })
      .catch((error: any) => {
        console.log("error: ", error);
        dispatch(
          updateResponse({
            severity: "error",
            message: "عملیات ناموفق. لطفا دوباره تلاش کنید.",
            open: true,
          })
        );
      });
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        paddingBottom: 8,
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 2,
        height: "100vh",
        "@media (max-width: 768px)": {
          height: "auto",
        },
      }}
    >
      <Grid container>
        <Grid item>
          <Typography variant="h4" className={classes.marginButton}>
            اطلاعات معلم
          </Typography>
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          username: userInfo.username,
          national_code: userInfo.national_code,
          phone_number: userInfo.phone_number,
          email: userInfo.email,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          birthday_date: userInfo.birthday_date,
          gender: userInfo.gender,
          school_name: userInfo.school_name,
          personal_code: userInfo.personal_code,
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
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="national_code">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="کد ملی"
                      placeholder="کد ملی"
                      id="national_code"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="phone_number">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="شماره همراه"
                      placeholder="شماره همراه"
                      id="phone_number"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
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
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field name="birthday_date">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="تاریخ تولد"
                      placeholder="تاریخ تولد"
                      id="birthday_date"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="first_name">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="نام"
                      placeholder="نام"
                      id="first_name"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="last_name">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="نام خانوادگی"
                      placeholder="نام خانوادگی"
                      id="last_name"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Field name="School_name">
                  {({ field, meta }: FieldProps) => (
                    <TextField
                      {...field}
                      label="نام مدرسه"
                      placeholder="نام مدرسه"
                      id="School_name"
                      autoFocus
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error ? true : false}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
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
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={3}>
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
                      helperText={meta.touched && meta.error ? meta.error : ""}
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
                  ویرایش
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TeacherProfile;
