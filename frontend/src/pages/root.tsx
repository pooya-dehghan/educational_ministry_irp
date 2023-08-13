import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import styles from './login.module.css';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import { Container, Link } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../features/auth/authThunk';
import { login } from '../features/auth/authSlice';

const useStyles = makeStyles({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw !important',
  },
  loginHeader: {
    textAlign: 'center',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  textAreaContainer: {
    textAlign: 'center',
  },
  loginLink: {
    textAlign: 'center',
  },
});

const Root = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('handling wether user is authenticated or not');
  },[]);

  return (
    <>
    </>
  );
};

export default Root;
