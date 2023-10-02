// ThemeProviderWrapper.tsx

import React, { useState, ReactNode } from 'react';
import CustomizedSnackbars from '../../components/snackBar/snackBar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateResponse } from '../../features/response/responseSlice';

interface AlertWrapperProps {
  children: ReactNode;
}

const AlertWrapper: React.FC<AlertWrapperProps> = ({ children }) => {
  const message = useSelector((state: RootState) => state.response.message);
  const severity = useSelector((state: RootState) => state.response.severity);
  const open = useSelector((state: RootState) => state.response.open);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      updateResponse({
        severity: '',
        message: '',
        open: false,
      })
    );
  };
  return (
    <>
      <CustomizedSnackbars
        message={message}
        severity={severity}
        open={open}
        handleClose={handleClose}
      />
      {children}
    </>
  );
};

export default AlertWrapper;
