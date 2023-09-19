import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dashboard from '../Dashboard/Dashboard';
import useUserInfo from '../../hooks/useUserInfo/useUserInfo';
import { useParams } from 'react-router-dom';
import CustomModal from '../../components/CustomModal/CustomModal';
import OfficeManagerProfile from '../profiles/OfficeManager/OfficeManager';

const UserInfo = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  let { userType, id } = useParams();
  if (!id) {
    id = '0';
  }
  if (!userType) {
    userType = 'officemanager';
  }
  const { userInfo, changeUserInfoHandler, updateUserInfoHandler, error } =
    useUserInfo(userType, parseInt(id));
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
      <CustomModal
        open={error ? true : false}
        handleClose={() => {
          setOpenModal(false);
        }}
        handleOpen={() => {
          setOpenModal(true);
        }}
        header={'خطا !'}
        body={error || 'مشکلی پیش آمده است'}
      />
      {!openModal && (
        <Dashboard>
          <OfficeManagerProfile />
        </Dashboard>
      )}
    </>
  );
};

export default UserInfo;
