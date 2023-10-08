import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomAlert from '../../components/Alert/Alert';
import { useDispatch } from 'react-redux';
import { seenNotificationAsync } from '../../features/notifications/notificationThunk';
import { updateResponse } from '../../features/response/responseSlice';
import { Typography } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import Divider from '@mui/material/Divider';

type Notif = {
  body: string;
  code: number;
  created: string;
  id: number;
  receiver: number;
  sender: number;
  title: string;
  updated: string;
  view: string;
};

interface NotificationsProps {
  notifications: Notif[];
  removeNotifById: (id: number) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  notifications,
  removeNotifById,
}) => {
  const dispatch = useDispatch();

  const seenNotificationHandler = (id: number, setButtonLoading: any) => {
    setButtonLoading(true);
    (dispatch as any)(seenNotificationAsync({ id: id }))
      .unwrap()
      .then((response: any) => {
        removeNotifById(id);
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'نوتیفیکیشن با موفقیت دیده شد.',
            open: true,
          })
        );
        setButtonLoading(false);
      })
      .catch((error: any) => {
        console.log('error: ', error);
        dispatch(
          updateResponse({
            severity: 'error',
            message: 'عملیات ناموفق.',
            open: true,
          })
        );
        setButtonLoading(false);
      });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        maxHeight: 400,
        overflowY: 'auto',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'spaceBetween ',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {notifications.length ? (
        notifications.map((notif, index) => {
          return (
            <>
              <Grid item sx={{ width: '100%' }}>
                <CustomAlert
                  alertBody={notif.body}
                  alertTitle={notif.title}
                  seenClickHandler={(setButtonLoading: any) =>
                    seenNotificationHandler(notif.id, setButtonLoading)
                  }
                />
                <Divider />
              </Grid>
            </>
          );
        })
      ) : (
        <Grid container>
          <Grid item>
            <Typography>هیچ نوتیفیکیشینی برای نمایش وجود ندارد</Typography>
          </Grid>
          <Grid item>
            <NotificationImportantIcon />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Notifications;
