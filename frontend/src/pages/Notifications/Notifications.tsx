import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomAlert from '../../components/Alert/Alert';
import { useDispatch } from 'react-redux';
import { seenNotificationAsync } from '../../features/notifications/notificationThunk';
import { updateResponse } from '../../features/response/responseSlice';

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
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const dispatch = useDispatch();

  const seenNotificationHandler = (id: number) => {
    (dispatch as any)(seenNotificationAsync({ id: id }))
      .unwrap()
      .then((response: any) => {
        dispatch(
          updateResponse({
            severity: 'success',
            message: 'نوتیفیکیشن با موفقیت دیده شد.',
            open: true,
          })
        );
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
      });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        maxHeight: 400,
        overflowY: 'scroll',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'absolute',
        right: 0,
        bottom: 0,
      }}
    >
      {notifications.length &&
        notifications.map((notif, index) => {
          return (
            <Grid item>
              <CustomAlert
                alertBody={notif.body}
                alertTitle={notif.title}
                seenClickHandler={() => seenNotificationHandler(notif.id)}
              />
            </Grid>
          );
        })}
    </Box>
  );
};

export default Notifications;
