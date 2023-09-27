import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import styles from "./login.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import Box from "@mui/material/Box";
import { Container, Link, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../features/auth/authThunk";
import { login } from "../../features/auth/authSlice";
import { updateResponse } from "../../features/response/responseSlice";
import { useNavigate } from "react-router-dom";
import * as tokenHandler from "../../utils/token/index";

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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [password, setPassword] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    setButtonLoading(true);
    const loginData = {
      username,
      password,
    };
    (dispatch as any)(loginAsync(loginData))
      .unwrap()
      .then((response: any) => {
        dispatch(login(response));
        dispatch(
          updateResponse({
            severity: "success",
            message: "شما با موفقیت وارد سامانه جامع شدید.",
            open: true,
          })
        );
        tokenHandler.setToken(response.access);
        tokenHandler.setRefreshToken(response.refresh);
        setButtonLoading(false);
        navigate("/dashboard");
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
                ورود
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
                  onChange={(e) => setPassword(e.target.value)}
                  id="outlined-basic"
                  label="گذرواژه"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={8} className={classes.buttonContainer}>
                <Button
                  onClick={() => handleLogin()}
                  variant="contained"
                  disabled={buttonLoading}
                >
                  {buttonLoading ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={24} color="inherit" />{" "}
                      <Typography
                        style={{ fontSize: "13px", marginRight: "8px" }}
                      >
                        در حال ورود
                      </Typography>
                    </div>
                  ) : (
                    "ورود"
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="signup">تا به حال ثبت نام نکرده اید ؟ ثبت نام کنید</Link>
              </Grid>
              <Grid item xs={12} className={classes.loginLink}>
                <Link href="resset">رمز عبور خود را فراموش کرده اید؟</Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Login;
