import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Card, Grid } from '@mui/material';
import Dashboard from '../Dashboard/Dashboard';
import Request from '../../components/Request/Request';
import { useDispatch } from 'react-redux';
import {
  getAllRequestsAsync,
  rejectRequestAsync,
  acceptRequestAsync,
} from '../../features/requests/requestThunk';
import { updateResponse } from '../../features/response/responseSlice';
import Search from '../../components/Search/Search';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (dispatch as any)(getAllRequestsAsync())
      .unwrap()
      .then((response: any) => {
        setRequests(response);
      })
      .catch((error: any) => {});
  }, []);

  const acceptRequest = (schoolID: number | undefined, requestID: number) => {
    (dispatch as any)(
      acceptRequestAsync({ school_id: schoolID, request_id: requestID })
    )
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'درخواست دانشجو با موفقیت قبول شد.',
            open: true,
          })
        );
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق..',
            open: true,
          })
        );
      });
  };

  const rejectRequest = (id: number) => {
    (dispatch as any)(rejectRequestAsync({ id }))
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'درخواست دانشجو با موفقیت قبول شد.',
            open: true,
          })
        );
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق..',
            open: true,
          })
        );
      });
  };

  const searchCodeOnChange = (searchInput: string) => {
    setCode(searchInput);
    setTimeout(() => {
      console.log('searchInput: ', searchInput);
    }, 2000);
  };

  const withDrawRequest = (id: number) => {};

  const deleteCodeSearch = () => {
    setCode('');
  };

  const searchCode = () => {};

  return (
    <Dashboard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        component={'div'}
      >
        <Grid container mt={3} mb={3}>
          <Grid item>
            <Search
              onchange={searchCodeOnChange}
              ondelete={deleteCodeSearch}
              search={searchCode}
            />
          </Grid>
        </Grid>
        <Grid container mt={3} mb={3} spacing={2}>
          {requests &&
            requests.map((req, index) => {
              return (
                <Grid item xs={12} md={6} sm={6} lg={6}>
                  <Request
                    acceptRequest={(schoolID, requestID) =>
                      acceptRequest(schoolID, requestID)
                    }
                    rejectRequest={(id) => rejectRequest(id)}
                    request={req}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Dashboard>
  );
};

export default Requests;
