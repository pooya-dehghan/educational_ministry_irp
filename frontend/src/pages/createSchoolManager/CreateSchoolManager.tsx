import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import styles from "./createSM.module.css";
import Dashboard from "../Dashboard/Dashboard";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { useTextFieldStyles } from "../../hooks/TextFieldStyle/TextFieldStyle"; // Update the path
//import { createSchoolManagerAsync } from "../../features/schoolmanager/schoolmanagerThunk";
import { useDispatch } from "react-redux";
//import { createSchoolManager } from "../../features/schoolmanager/schoolmanagerSlice";
import { updateResponse } from "../../features/response/responseSlice";
import { Values } from "./interface";
import { schoolManagerValidationSchema } from "../../validations/create-schoolmanger-validation";

const theme = createTheme();

const CreateSchoolManager: React.FC = () => {
  const dispatch = useDispatch();
  // const handleSubmit = (values: Values, setSubmitting: any) => {
  //   let createOfficeManagerData = {
  //     password: values.password,
  //     password_confirmation: values.password_confirmation,
  //     username: values.username,
  //   };
  //   (dispatch as any)(createSchoolManagerAsync(createOfficeManagerData))
  //     .unwrap()
  //     .then((response: any) => {
  //       dispatch(createSchoolManager({}));
  //     })
  //     .catch((error: any) => {
  //       console.log("error: ", error);
  //       dispatch(
  //         updateResponse({
  //           severity: "error",
  //           message:
  //             "عملیات ناموفق لطفا نام کاربری و رمز عبور صحیح را وارد نمایید.",
  //           open: true,
  //         })
  //       );
  //     });
  //   setSubmitting(false);
  // };

  return (
    <>
      <Dashboard>
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                backgroundColor: "white",
                marginTop: 8,
                marginBottom: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h3"
                variant="subtitle1"
                sx={{ fontSize: "1rem" }}
              >
                ثبت مدیر مدرسه
              </Typography>

              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  schoolName: "",
                  nationalCode: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                  username: "",
                }}
                validationSchema={schoolManagerValidationSchema} // Add validation schema
                onSubmit={(values: Values, { setSubmitting }: any) => {
                  // handleSubmit(values, setSubmitting);
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
                                  : ""
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
                                meta.touched && meta.error ? meta.error : ""
                              }
                            />
                          )}
                        </Field>
                      </Grid>
                      <Grid item xs={12} sm={6}>
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
                                meta.touched && meta.error ? meta.error : ""
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
                                meta.touched && meta.error ? meta.error : ""
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
                                meta.touched && meta.error ? meta.error : ""
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
                                meta.touched && meta.error ? meta.error : ""
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
                                meta.touched && meta.error ? meta.error : ""
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
                                meta.touched && meta.error ? meta.error : ""
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

export default CreateSchoolManager;
