import { Box } from '@mui/system';
import { Card, Grid } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';
import Request from '../../components/Request/Request';

const Requests = () => {
  return (
    <Dashboard>
      <Box component={'div'}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Request />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Request />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Request />
          </Grid>
        </Grid>
      </Box>
    </Dashboard>
  );
};

export default Requests;
