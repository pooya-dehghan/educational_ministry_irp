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
      <AlertTitle mb={2}>{alertTitle}</AlertTitle>
      <Typography mt={1} variant="body2" color={'grey'}>
        {alertBody}
      </Typography>
    </Alert>
  );
};

export default CustomAlert;
