import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

interface CustomAlertProps {
  alertTitle: string;
  alertBody: string;
  seenClickHandler: (setButtonLoading: any) => void;
}

const classes = {
  marginBottom: '2rem',
  marginTop: '1rem',
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  alertTitle,
  alertBody,
  seenClickHandler,
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  return (
    <Alert
      action={
        <Button
          onClick={() => seenClickHandler(setButtonLoading)}
          color="inherit"
          size="small"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={24} color="inherit" />{' '}
              <Typography style={{ fontSize: '13px', marginRight: '8px' }}>
                در حال ارسال درخواست
              </Typography>
            </div>
          ) : (
            'دیده شد'
          )}
        </Button>
      }
      severity="info"
    >
      <AlertTitle className={classes.marginBottom}>{alertTitle}</AlertTitle>
      <Typography className={classes.marginTop} variant="body2" color={'grey'}>
        {alertBody}
      </Typography>
    </Alert>
  );
};

export default CustomAlert;
