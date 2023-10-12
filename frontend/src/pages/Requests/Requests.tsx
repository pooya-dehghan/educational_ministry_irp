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
import { withDrawAsync } from '../../features/requests/requestThunk';
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

  const acceptRequest = (
    schoolID: number | undefined,
    requestID: number,
    setLoadingAcceptRequest: (value: boolean) => void
  ) => {
    setLoadingAcceptRequest(true);
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
        setLoadingAcceptRequest(false);
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق..',
            open: true,
          })
        );
        setLoadingAcceptRequest(false);
      });
  };

  const rejectRequest = (
    id: number,
    setLoadingRejectRequest: (value: boolean) => void
  ) => {
    setLoadingRejectRequest(true);
    (dispatch as any)(rejectRequestAsync({ id }))
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'warning',
            message: 'درخواست دانشجو رد شد شد.',
            open: true,
          })
        );
        setLoadingRejectRequest(false);
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق..',
            open: true,
          })
        );
        setLoadingRejectRequest(false);
      });
  };
  const withDrawRequest = (
    id: number,
    setLoadingWithDrawRequest: (value: boolean) => void
  ) => {
    setLoadingWithDrawRequest(true);
    (dispatch as any)(withDrawAsync({ id }))
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'info',
            message: 'درخواست دانشجو با موفقیت به حالت اولیه برگردانده شد.',
            open: true,
          })
        );
        setLoadingWithDrawRequest(false);
      })
      .catch((error: any) => {
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق..',
            open: true,
          })
        );
        setLoadingWithDrawRequest(false);
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
          margin: 1,
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
                    acceptRequest={(
                      schoolID,
                      requestID,
                      setLoadingAcceptRequest
                    ) =>
                      acceptRequest(
                        schoolID,
                        requestID,
                        setLoadingAcceptRequest
                      )
                    }
                    rejectRequest={(id, setLoadingRejectRequest) =>
                      rejectRequest(id, setLoadingRejectRequest)
                    }
                    withDrawRequest={(id, setLoadingWithdrawRequest) =>
                      withDrawRequest(id, setLoadingWithdrawRequest)
                    }
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
