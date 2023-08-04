import React from 'react';
import ListOf from '../../components/ListOf/ListOf';
import Grid from '@mui/material/Grid';
import Dashboard from '../Dashboard/Dashboard';

const List = () => {
  return (
    <Dashboard>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={2} md={4} lg={3}>
          <ListOf />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default List;
