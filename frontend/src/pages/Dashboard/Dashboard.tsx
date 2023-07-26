import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import SideBar from '../../components/SideBar/SideBar';

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <Box component={'div'}>
      <Grid>there was some problems</Grid>
      <SideBar
        open={drawerOpen}
        handleDrawerToggle={() => setDrawerOpen(!drawerOpen)}
      />
    </Box>
  );
};

export default Dashboard;
