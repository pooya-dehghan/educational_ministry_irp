import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import SchoolIcon from "@mui/icons-material/School";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { makeStyles } from "@material-ui/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, Divider, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../features/auth/authThunk";
import { login } from "../features/auth/authSlice";
import styles from "./root.module.css";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("handling wether user is authenticated or not");
  }, []);

  return (
    <>
      <Grid className={styles.container}>
        <Grid className={styles.header}>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <img
              src="https://www.uplooder.net/img/image/55/f90ee42c3619c6eafd0b176d708b526f/arm-uni-97-white-300x300.png"
              style={{ width: "100px", height: "100px" }}
            ></img>
          </Grid>
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <Grid
              style={{
                width: "18%",
                height: "3px",
                backgroundColor: "white", // Color of the top line
              }}
            />
            <div
              style={{
                margin: "0 10px",
                color: "black",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              سامانه دانشجویی
            </div>
            <Grid
              style={{
                width: "18%",
                height: "3px",
                backgroundColor: "white", // Color of the bottom line
              }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.7rem",
                marginTop: "15px",
                textAlign: "center",
              }}
            >
              سامانه مدیریت کارورزی دانشگاه تربیت دبیر شهید رجایی
            </Typography>
            <Typography
              sx={{
                maxWidth: "700px",
                textAlign: "center",
                color: "black",
                marginTop: "15px",
                padding: "0 20px", // Add padding to make it more readable on small screens
              }}
            >
              این سامانه با هدف تسهیل فرایند کارورزی دانشجویان این دانشگاه و
              بوجود آوردن یک سیستم یکپارچه برای ارتباط آسان تر دانشگاه و ادارات
              آموزش و پرورش بوجود آمده است
            </Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ marginBottom: "30px", width: "120px" }}
              onClick={() => navigate("/login")}
            >
              ورود
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginLeft: "30px",
          }}
          xs={12}
        >
          <Grid item xs={12}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                paddingTop: "10px",
              }}
            >
              <h3>چرایی بوجود آمدن این سایت</h3>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderColor: "black", width: "95%" }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "right",
                flexDirection: "row",
              }}
            >
              <LooksOneIcon sx={{ fontSize: "10rem" }} />
              <div>
                <h4>تسهیل در اخذ کارورزی</h4>
                <Typography sx={{ maxWidth: "420px" }}>
                  فرایند اخذ کارورزی و انتخاب مدرسه به روش سنتی ، برای دانشجویان
                  کارورز سخت و زمان گیر بود. با استفاده از این سامانه این مشکل
                  تا حد زیادی برطرف شده است.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LooksTwoIcon sx={{ fontSize: "10rem" }} />
              <div>
                <h4>تسهیل در رفت و آمدها</h4>
                <Typography sx={{ maxWidth: "420px" }}>
                  دانشجو به جای اینکه چندین بار بین دانشگاه ، اداره‌ی آموزش و
                  پرورش و مدرسه رفت و آمد کند، همه‌ی کارهای خود را در این سامانه
                  انجام می دهد.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Looks3Icon sx={{ fontSize: "10rem" }} />
              <div>
                <h4>نوین بودن </h4>
                <Typography sx={{ maxWidth: "420px" }}>
                  علاوه بر بحث رفت و آمدها، فرایندهای دیگر کارورزی همچون حضور
                  غیاب ، ارزیابی و... به صورت الکترونیکی صورت می گیرد.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Looks4Icon sx={{ fontSize: "10rem" }} />
              <div>
                <h4>تجربه مناسب</h4>
                <Typography sx={{ maxWidth: "420px" }}>
                  بدون شک سهولت و نوین بودن فرایند کارورزی برای دانشجویان با
                  استفاده از این سامانه ، تجربه‌ی خوبی را برجای خواهد گذاشت.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: "50px" }}>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "rgb(235, 97, 52)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography variant="h5">مزایای استفاده از این سایت</Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ backgroundColor: "rgb(235, 97, 52)" }}
          >
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={6}
              sx={{ border: "1px solid white", padding: "16px" }}
            >
              <PsychologyIcon sx={{ fontSize: "8rem", paddingLeft: "20px" }} />
              <div style={{ padding: "20px" }}>
                <h3>استاد</h3>
                <Typography>
                  استاد می تواند دانشجوهای خود را ببیند ، تکالیف لازم را به آنها
                  بدهد
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={6}
              sx={{ border: "1px solid white", padding: "16px" }}
            >
              <PsychologyAltIcon
                sx={{ fontSize: "8rem", paddingLeft: "20px" }}
              />
              <div style={{ padding: "20px" }}>
                <h3>دانشجو</h3>
                <Typography>
                  دانشجو از طریق این سامانه می تواند درخواست کارورزی خود را ثبت
                  کرده و تکالیف خود را انجام دهد.
                </Typography>
              </div>
            </Grid>

            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={6}
              sx={{ border: "1px solid white", padding: "16px" }}
            >
              <ApartmentIcon sx={{ fontSize: "8rem", paddingLeft: "20px" }} />
              <div style={{ padding: "20px" }}>
                <h3>مسئولین کارورزی ادارات آموزش و پرورش </h3>
                <Typography>
                  مسئولین ادارات ، می توانند درخواست های دان آموزان را بررسی
                  کرده و آن ها را به مدارس فنی و هنرستان ها بفرستند.
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              display="flex"
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={6}
              sx={{ border: "1px solid white", padding: "16px" }}
            >
              <SchoolIcon sx={{ fontSize: "8rem", paddingLeft: "20px" }} />
              <div style={{ padding: "20px" }}>
                <h3>مدیران مدارس </h3>
                <Typography>
                  مدیران مدارس فنی می توانند دانشجویان کارورز را پذیرفته و
                  ارزیابی آنها را در این سامانه انجام دهند
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            height: "100px",
            backgroundColor: "rgb(20, 18, 18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Link
              underline="hover"
              color="white"
              borderRight="1px solid white"
              paddingRight="15px"
              paddingLeft="15px"
              fontSize="0.6rem"
            >
              صفحه نخست
            </Link>
            <Link
              underline="hover"
              color="white"
              borderRight="1px solid white"
              paddingRight="15px"
              paddingLeft="15px"
              fontSize="0.6rem"
            >
              درباره ما
            </Link>
            <Link
              underline="hover"
              color="white"
              borderRight="1px solid white"
              paddingRight="15px"
              paddingLeft="15px"
              fontSize="0.6rem"
            >
              خدمات
            </Link>
            <Link
              underline="hover"
              color="white"
              paddingRight="15px"
              paddingLeft="15px"
              fontSize="0.6rem"
            >
              قوانین سایت
            </Link>
            <Typography variant="body2" align="center" marginTop="10px">
              © {new Date().getFullYear()} سامانه دانشجویی
            </Typography>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Root;
