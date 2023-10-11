import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Formik, Form, Field, FormikHelpers, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './student.module.css';
import { StudentInterface } from '../../../interfaces/student.interface';
import { useDispatch } from 'react-redux';
import { updatestudent } from '../../../features/student/studentSlice';
import { updateResponse } from '../../../features/response/responseSlice';
import { updatestudentAsync } from '../../../features/student/studentThunk';
import { sendRequestAsync } from '../../../features/requests/requestThunk';
import { makeStyles } from '@mui/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import {} from '../../../features/requests/requestThunk';
import FormControl from '@mui/material/FormControl';
import UploadFileButton from '../../../components/UploadFile/UploadFile';
import { getStudentsTasksAsync } from '../../../features/task/taskThunk';
import Task from '../../../components/Task/task';

const useStyles = makeStyles((theme) => ({
  marginButton: {
    marginBottom: '3rem', // Add margin here
    fontStyle: 'bold',
  },
  marginTop: {
    marginTop: '2rem',
  },
  selectRegion: {
    width: '30%',
  },
  buttonSendRequest: {
    width: '30%',
  },
}));

interface StudentProfileProps {
  userInfo: StudentInterface;
  id: number;
}

interface ITask {
  title: string;
  description: string;
  id: string;
  deadline: string;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userInfo, id }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [region, setRegion] = useState<number | undefined>();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (dispatch as any)(getStudentsTasksAsync())
      .unwrap()
      .then((response: any) => {
        setTasks(response.data);
      })
      .catch((error: any) => {});
  }, []);

  const handleSendRequest = () => {
    setButtonLoading(true);
    if (region) {
      (dispatch as any)(sendRequestAsync({ region }))
        .unwrap()
        .then((response: any) => {
          dispatch(
            updateResponse({
              severity: 'success',
              message: 'درخواست کارورزی شما با موفقیت ارسال شد.',
              open: true,
            })
          );
          setButtonLoading(false);
        })
        .catch((error: any) => {
          dispatch(
            updateResponse({
              severity: 'error',
              message: 'عملیات ناموفق. لطفا دوباره تلاش کنید.',
              open: true,
            })
          );
          setButtonLoading(false);
        });
    }
  };
  const handleSubmit = (values: any, setSubmitting: any) => {
    let updateStudentData = {
      username: values.username,
      national_code: values.national_code,
      phone_number: values.phone_number,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      gender: values.gender,
      personal_code: values.personal_code,
    };
    (dispatch as any)(
      updatestudentAsync({ studentID: id, ...updateStudentData })
    )
      .unwrap()
      .then((response: any) => {
        dispatch(updatestudent(response));
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

  return (
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
            اطلاعات دانشجو
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
                      helperText={meta.touched && meta.error ? meta.error : ''}
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
          <Typography variant="h4" className={classes.marginTop}>
            بارگذاری تصویر پروفایل
          </Typography>
        </Grid>
      </Grid>
      <Grid container mt={5}>
        <UploadFileButton />
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h4" className={classes.marginTop}>
            درخواست کارورزی
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.marginTop}
            textAlign="justify"
          >
            کاربر گرامی با انتخاب ناحیه مورد نظر خود درخواست شروع کارورزی خود را
            برای مسئول آموزش و پرورش ناحیه ارسال کنید پس از ارسال این درخواست
            مسئول مربوطه به وضعیت درخواست کارورزی رسیدگی خواهد کرد و نتیجه
            رسیدگی در باکس اطلاع رسانی شما قرار خواهد گرفت.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth className={classes.selectRegion}>
            <InputLabel id="region_provider_for_student">منطقه</InputLabel>
            <Select
              labelId="region_provider_for_student"
              id="demo-simple-select"
              value={region}
              label="منطقه"
              onChange={(value) => setRegion(value.target.value)}
            >
              <MenuItem value={1}>منطقه 1</MenuItem>
              <MenuItem value={2}>منطقه 2</MenuItem>
              <MenuItem value={3}>منطقه 3</MenuItem>
              <MenuItem value={4}>منطقه 4</MenuItem>
              <MenuItem value={5}>منطقه 5</MenuItem>
              <MenuItem value={6}>منطقه 6</MenuItem>
              <MenuItem value={7}>منطقه 7</MenuItem>
              <MenuItem value={8}>منطقه 8</MenuItem>
              <MenuItem value={9}>منطقه 9</MenuItem>
              <MenuItem value={10}>منطقه 10</MenuItem>
              <MenuItem value={11}>منطقه 11</MenuItem>
              <MenuItem value={12}>منطقه 12</MenuItem>
              <MenuItem value={13}>منطقه 13</MenuItem>
              <MenuItem value={14}>منطقه 14</MenuItem>
              <MenuItem value={15}>منطقه 15</MenuItem>
              <MenuItem value={16}>منطقه 16</MenuItem>
              <MenuItem value={17}>منطقه 17</MenuItem>
              <MenuItem value={18}>منطقه 18</MenuItem>
              <MenuItem value={19}>منطقه 19</MenuItem>
              <MenuItem value={20}>منطقه 20</MenuItem>
              <MenuItem value={21}>منطقه 21</MenuItem>
              <MenuItem value={22}>منطقه 22</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} className={classes.buttonSendRequest}>
          <Button
            onClick={() => handleSendRequest()}
            variant="contained"
            disabled={buttonLoading}
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            {buttonLoading ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} color="inherit" />{' '}
                <Typography style={{ fontSize: '13px', marginRight: '8px' }}>
                  در حال ارسال
                </Typography>
              </div>
            ) : (
              'ثبت'
            )}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h4" className={classes.marginTop}>
            تکالیف محول شده به دانشجو
          </Typography>
        </Grid>
      </Grid>
      <Grid container mt={4} mb={4}>
        {tasks.length > 0
          ? tasks.map((task: ITask) => {
              return (
                <Grid item lg={4} mb={4}>
                  <Task
                    title={task.title}
                    description={task.description}
                    buttonText={'اپلود فایل'}
                    taskID={task.id}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};

export default StudentProfile;
