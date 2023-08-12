import React from "react";
import ListOf from "../../components/ListOf/ListOf";
import Grid from "@mui/material/Grid";
import Dashboard from "../Dashboard/Dashboard";
import styles from "./Lists.module.css";

const List = () => {
  return (
    <Dashboard>
      <Grid container spacing={2} className={styles.grid}>
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
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ListOf />
        </Grid>
      </Grid>
    </Dashboard>
  );
};

export default List;
