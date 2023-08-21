import { useEffect } from 'react';
import ListOf from '../../components/ListOf/ListOf';
import Grid from '@mui/material/Grid';
import Dashboard from '../Dashboard/Dashboard';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllOfficeManagersAsync } from '../../features/officemanager/officemanagerThunk';
import { getAllSchoolsAsync } from '../../features/school/schoolThunk';
import { getAllProfessorsAsync } from '../../features/professor/professorThunk';
import { getAllstudentsAsync } from '../../features/student/studentThunk';
import styles from './Lists.module.css';

const List = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const modelPathArray = pathname.split('/');
  const getterBase = modelPathArray[modelPathArray.length - 1];
  useEffect(() => {
    (dispatch as any)(getAllOfficeManagersAsync({}))
      .unwrap()
      .then((response: any) => {
        console.log('hello list officemanagers: ', response);
        // dispatch(response.user);
      })
      .catch((error: any) => {});
    (dispatch as any)(getAllSchoolsAsync({}))
      .unwrap()
      .then((response: any) => {
        console.log('hello list schools: ', response);
        // dispatch(response.user);
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllProfessorsAsync({}))
      .unwrap()
      .then((response: any) => {
        console.log('hello list schools: ', response);
        // dispatch(response.user);
      })
      .catch((error: any) => {});

    (dispatch as any)(getAllstudentsAsync({}))
      .unwrap()
      .then((response: any) => {
        console.log('hello list schools: ', response);
        // dispatch(response.user);
      })
      .catch((error: any) => {});
  }, []);
  return (
    <Dashboard>
      <Grid container spacing={2} className={styles.grid}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
        {/* <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid> */}
      </Grid>
    </Dashboard>
  );
};

export default List;
