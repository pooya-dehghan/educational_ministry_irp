import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './professor.module.css';
import { ProfessorInterface } from '../../../interfaces/professor.interface';
import { useDispatch } from 'react-redux';
import { updateProfessor } from '../../../features/professor/professorSlice';
import { updateResponse } from '../../../features/response/responseSlice';
import { updateProfessorAsync } from '../../../features/professor/professorThunk';
import { makeStyles } from '@mui/styles';
import { getAllProfessorRequestsAsync } from '../../../features/professorRequest/professorRequestThunk';
import ListOf from '../../../components/ListOf/ListOf';
import ProfessorRequestModal from '../../../components/ProfessorRequestModal/ProfessorRequestModal';
import { acceptProfessorRequestAsync } from '../../../features/professorRequest/professorRequestThunk';
import { rejectProfessorRequestAsync } from '../../../features/professorRequest/professorRequestThunk';
import { createTaskAsync } from '../../../features/task/taskThunk';
import { DatePicker } from 'zaman';
import CircularProgress from '@mui/material/CircularProgress';
import CustomeClasses from './professor.module.css';

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginBottom: '3rem', // Add margin here
    fontStyle: 'bold',
  },
}));

interface ProfessorProfileProps {
  userInfo: ProfessorInterface;
  id: number;
}

interface ISelectedCard {
  id: number | undefined;
}

const ProfessorProfile: React.FC<ProfessorProfileProps> = ({
  userInfo,
  id,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [buttonAcceptLoading, setButtonAcceptLoading] = useState(false);
  const [buttonRejectLoading, setButtonRejectLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    id: undefined,
  });
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = React.useState<Date>();

  useEffect(() => {
    (dispatch as any)(getAllProfessorRequestsAsync())
      .unwrap()
      .then((response: any) => {
        setStudents(response.data);
      })
      .catch((error: any) => {});
  }, []);

  const handleSubmit = (values: any, setSubmitting: any) => {
    let updateProfessorData = {
      username: values.username,
      national_code: values.national_code,
      phone_number: values.phone_number,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      personal_code: values.personal_code,
      professor_id: values.professor_id,
    };
    (dispatch as any)(updateProfessorAsync({ id: id, ...updateProfessorData }))
      .unwrap()
      .then((response: any) => {
        dispatch(updateProfessor(response));
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'پروفایل شما با موفقیت بروزرسانی شد..',
            open: true,
          })
        );
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
            open: true,
          })
        );
      });
  };

  const selectStudent = (payload: any) => {
    setSelectedCard(payload);
    setOpenRequestModal(true);
  };

  const RejectStudentRequest = () => {
    setButtonRejectLoading(true);
    if (!selectedCard.id) return;
    (dispatch as any)(rejectProfessorRequestAsync({ id: selectedCard.id }))
      .unwrap()
      .then((response: any) => {
        setButtonRejectLoading(false);
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'لغو اخذ دانشجو با موفقیت انجام شد',
            open: true,
          })
        );
        setButtonRejectLoading(false);
      })
      .catch((error: any) => {
        setButtonRejectLoading(false);
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات با موفقیت انجام نشد.',
            open: true,
          })
        );
      });
  };

  const AcceptStudentRequest = () => {
    setButtonAcceptLoading(true);
    if (!selectedCard.id) return;
    (dispatch as any)(acceptProfessorRequestAsync({ id: selectedCard.id }))
      .unwrap()
      .then((response: any) => {
        setButtonAcceptLoading(false);
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'درخواست اخذ با موفقیت انجام شد.',
            open: true,
          })
        );
        setButtonAcceptLoading(false);
      })
      .catch((error: any) => {
        setButtonAcceptLoading(false);
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات با موفقیت انجام نشد.',
            open: true,
          })
        );
      });
  };

  const CreateTaskProfessor = () => {
    setTaskLoading(true);
    if (date) {
      let month: number | string = date.getUTCMonth() + 1; //months from 1-12
      let day: number | string = date.getUTCDate();
      let year: number | string = date.getUTCFullYear();
      let newdate = year + '-' + month + '-' + day;
      if (month < 10) {
        month = '0' + month;
      }
      if (day < 10) {
        day = '0' + day;
      }
      (dispatch as any)(
        createTaskAsync({
          title: title,
          description: description,
          deadline: newdate,
        })
      )
        .unwrap()
        .then((response: any) => {
          setTaskLoading(false);
          dispatch(
            updateResponse({
              severity: 'success',
              message:
                'تکلیف با موفقیت ساخته شد و برای دانشجویان شما ارسال شد.',
              open: true,
            })
          );
          setTaskLoading(false);
        })
        .catch((error: any) => {
          setTaskLoading(false);
          dispatch(
            updateResponse({
              severity: 'error',
              message: 'عملیات با موفقیت انجام نشد.',
              open: true,
            })
          );
        });
    }
  };

  return (
    <>
      <ProfessorRequestModal
        onClickAccept={AcceptStudentRequest}
        onClickReject={RejectStudentRequest}
        buttonAcceptLoading={buttonAcceptLoading}
        buttonRejectLoading={buttonRejectLoading}
        open={openRequestModal}
        handleClose={() => setOpenRequestModal(false)}
      />
      <Box
        sx={{
          backgroundColor: 'white',
          paddingBottom: 8,
          paddingTop: 8,
          paddingLeft: 12,
          paddingRight: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          borderRadius: 2,
          height: 'auto',
        }}
        className={styles.container}
      >
        <Grid container>
          <Grid item>
            <Typography variant="h4" className={classes.marginButton}>
              اطلاعات استاد
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
            gender: userInfo.gender,
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={3}>
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
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
                        helperText={
                          meta.touched && meta.error ? meta.error : ''
                        }
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
        <Grid container>
          <Grid item>
            <Typography variant="h4" mt={4}>
              بارگذاری تکلیف برای دانشجویان
            </Typography>
          </Grid>
          <Grid container mt={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              {' '}
              <TextField
                id="outlined-title"
                label="عنوان"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={9}>
              {' '}
              <TextField
                fullWidth
                id="outlined-description"
                label="توضیحات"
                variant="outlined"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item mb={3} mt={5} xs={12} sm={6} md={4} lg={3}>
              {'تاریخ تحویل '}
              <DatePicker
                onChange={(e) => {
                  setDate(e.value);
                }}
                className={CustomeClasses.datePickerClass}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={12} mb={4}>
              <Button
                onClick={() => CreateTaskProfessor()}
                variant="contained"
                disabled={taskLoading}
              >
                {taskLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} color="inherit" />{' '}
                    <Typography
                      style={{ fontSize: '13px', marginRight: '8px' }}
                    >
                      در حال ثبت تکلیف
                    </Typography>
                  </div>
                ) : (
                  'ثبت'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="h4">فهرست دانشجویان کارورز</Typography>
          </Grid>
          <Grid container spacing={2} className={styles.grid}>
            {students.length >= 1 ? (
              students.map((student: any, index) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ListOf
                      type="student"
                      username={student.username}
                      id={student.id}
                      buttonHide={true}
                      onClick={(payload: any) => selectStudent(payload)}
                      selected={selectedCard.id === student.id}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid sx={{ margin: '30px' }}>دانشجویی وجود ندارد</Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProfessorProfile;
