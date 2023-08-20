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
import styles from "./createSchool.module.css";
import Dashboard from "../Dashboard/Dashboard";
import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { useTextFieldStyles } from "../../hooks/TextFieldStyle/TextFieldStyle"; // Update the path
import { createSchoolAsync } from "../../features/school/schoolThunk";
import { useDispatch } from "react-redux";
import { createSchool } from "../../features/school/schoolSlice";
import { updateResponse } from "../../features/response/responseSlice";
import { Values } from "./interface/formikValues";
import { schoolValidationSchema } from "../../validations/create-school-validation";

const theme = createTheme();

const CreateOfficeManager: React.FC = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values: Values, setSubmitting: any) => {
    let createSchoolData = {
      schoolName: values.schoolName,
      managerName: values.managerName,
      address: values.address,
    };
    (dispatch as any)(createSchoolAsync(createSchoolData))
      .unwrap()
      .then((response: any) => {
        dispatch(createSchool({}));
      })
      .catch((error: any) => {
        console.log("error: ", error);
        dispatch(
          updateResponse({
            severity: "error",
            message:
              "عملیات ناموفق لطفا نام کاربری و رمز عبور صحیح را وارد نمایید.",
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
                ثبت مدرسه
              </Typography>

              <Formik
                initialValues={{
                  schoolName: "",
                  managerName: "",
                  address: "",
                }}
                validationSchema={schoolValidationSchema} // Add validation schema
                onSubmit={(values: Values, { setSubmitting }: any) => {
                  handleSubmit(values, setSubmitting);
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2} dir="rtl">
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
                                meta.touched && meta.error ? meta.error : ""
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
                              label="address"
                              placeholder="address"
                              id="address"
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

export default CreateOfficeManager;
