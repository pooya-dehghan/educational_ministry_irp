import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { Container, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../../features/signup/signUpThunk";
import { signup } from "../../features/signup/signUpSlice";
import { RootState } from "../../store/store"; // Make sure to provide the correct path

const useStyles = makeStyles({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100vw !important",
  },
  loginHeader: {
    textAlign: "center",
  },
  buttonContainer: {
    textAlign: "center",
  },
  textAreaContainer: {
    textAlign: "center",
  },
  loginLink: {
    textAlign: "center",
  },
});

const Root = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.signup.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.signup.user);
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const handleSignUp = () => {
    setButtonLoading(true);
    const signUpData = {
      username,
      password,
      password_confirmation,
      student_id: studentNumber,
    };

    (dispatch as any)(signUpAsync(signUpData))
      .unwrap()
      .then((response: any) => {
        dispatch(signup(response.user)); // Dispatch your signup action to update the state
        setButtonLoading(false);
      })
      .catch((error: any) => {
        setButtonLoading(false);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <Container
          component="main"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              px: 4,
              py: 6,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isSmallScreen ? "300px" : "500px",
              justifyContent: "center",
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
              <Grid item xs={8} className={classes.buttonContainer}>
                <Button
                  onClick={() => handleSignUp()}
                  variant="contained"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={24} color="inherit" />{" "}
                      <Typography
                        style={{ fontSize: "13px", marginRight: "8px" }}
                      >
                        در حال ثبت نام
                      </Typography>
                    </div>
                  ) : (
                    "ثبت نام"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="#">قبلا ثبت نام نموداه‌اید؟ وارد شوید</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Root;
