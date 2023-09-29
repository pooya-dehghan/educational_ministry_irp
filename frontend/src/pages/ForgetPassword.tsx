import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url(https://s8.uupload.ir/files/signupbg_bdw.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
});

const ForgetPassword: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Send a reset password email to the provided email address.
    // You can implement this functionality using your preferred backend service.

    // For demonstration purposes, we'll simply log the email to the console.
    console.log(`Reset password email sent to: ${email}`);
  };

  return (
    <div className={classes.root}>
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 3,
          marginTop: "100px",
          marginBottom: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          background:
            "linear-gradient(90deg, rgba(150,200,255 ,1) 0%, rgba(57,75,180,1) 0%, rgba(130,204,219,1) 17%)",
        }}
      >
        <h2>بازیابی رمز عبور</h2>
        <TextField
          label="ایمیل"
          variant="outlined"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          placeholder="ایمیل خود را وارد کنید"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "20px" }}
          onClick={handleResetPassword}
        >
          بازنشانی رمز عبور
        </Button>
      </Box>
    </div>
  );
};

export default ForgetPassword;
