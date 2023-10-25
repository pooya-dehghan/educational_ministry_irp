import { useEffect } from 'react';
import ListOf from '../../components/ListOf/ListOf';
import Grid from '@mui/material/Grid';
import Dashboard from '../Dashboard/Dashboard';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllOfficeManagersAsync } from '../../features/officemanager/officemanagerThunk';
import { getAllSchoolsAsync } from '../../features/school/schoolThunk';
import { getAllProfessorsAsync } from '../../features/professor/professorThunk';
import { getAllTeachersAsync } from '../../features/teacher/teacherThunk';
import { getAllstudentsAsync } from '../../features/student/studentThunk';
import { getAllNotificationsAsync } from '../../features/notifications/notificationThunk';
import { getAllOfficeManagers } from '../../features/officemanager/officemanagerSlice';
import { getAllProfessors } from '../../features/professor/professorSlice';
import { getAllSchools } from '../../features/school/schoolSlice';
import { getAllstudents } from '../../features/student/studentSlice';
import { getAllTeachers } from '../../features/teacher/teacherSlice';
import styles from './Lists.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useParams } from 'react-router-dom';

const List = () => {
  const { userType } = useParams();
  const dispatch = useDispatch();

  const allOfficeManagers = useSelector(
    (state: RootState) => state.officeManager.allOfficeManagers
  );
  const allProfessors = useSelector(
    (state: RootState) => state.professor.allProfessors
  );
  const allSchools = useSelector((state: RootState) => state.school.allschools);

  const allTeachers = useSelector(
    (state: RootState) => state.teacher.allteachers
  );
  const allStudents = useSelector(
    (state: RootState) => state.student.allstudents
  );

  useEffect(() => {
    (dispatch as any)(getAllOfficeManagersAsync({}))
      .unwrap()
      .then((response: any) => {
        dispatch(getAllOfficeManagers(response));
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllSchoolsAsync({}))
      .unwrap()
      .then((response: any) => {
        dispatch(getAllSchools(response));
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllProfessorsAsync())
      .unwrap()
      .then((response: any) => {
        dispatch(getAllProfessors(response));
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllstudentsAsync({}))
      .unwrap()
      .then((response: any) => {
        dispatch(getAllstudents(response));
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllTeachersAsync({}))
      .unwrap()
      .then((response: any) => {
        dispatch(getAllTeachers(response));
      })
      .catch((error: any) => {});
  }, []);

  const putRightListOnScreen = () => {
    if (!userType) {
      return;
    }
    return userType.trim() === 'officemanagers' ? (
      <Grid container spacing={2} className={styles.grid}>
        {allOfficeManagers.map((office_manager: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListOf
                type="officemanager"
                username={office_manager.username}
                id={office_manager.id}
                name={
                  office_manager.first_name + ' ' + office_manager.last_name
                }
                image={office_manager?.avatar}
              />
            </Grid>
          );
        })}{' '}
      </Grid>
    ) : userType.trim() === 'professors' ? (
      <Grid container spacing={2} className={styles.grid}>
        {allProfessors.map((professor: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListOf
                type="professor"
                username={professor.username}
                id={professor.id}
                name={professor.first_name + ' ' + professor.last_name}
                image={professor?.avatar}
              />
            </Grid>
          );
        })}{' '}
      </Grid>
    ) : userType.trim() === 'schools' ? (
      <Grid container spacing={2} className={styles.grid}>
        {allSchools.map((school: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListOf
                type="school"
                username={school.username}
                id={school.id}
                name={school.first_name + ' ' + school.last_name}
                image={school?.avatar}
              />
            </Grid>
          );
        })}{' '}
      </Grid>
    ) : userType.trim() === 'teachers' ? (
      <Grid container spacing={2} className={styles.grid}>
        {allTeachers.map((teacher: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListOf
                type="teacher"
                username={teacher.username}
                id={teacher.id}
                name={teacher.first_name + ' ' + teacher.last_name}
                image={teacher?.avatar}
              />
            </Grid>
          );
        })}{' '}
      </Grid>
    ) : userType.trim() === 'students' ? (
      <Grid container spacing={2} className={styles.grid}>
        {allStudents.map((student: any) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ListOf
                type="student"
                username={student.username}
                id={student.id}
                name={student.name}
                image={student?.avatar}
              />
            </Grid>
          );
        })}{' '}
      </Grid>
    ) : (
      <></>
    );
  };
  return <Dashboard>{putRightListOnScreen()}</Dashboard>;
};

export default List;
