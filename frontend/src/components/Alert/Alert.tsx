import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

interface CustomAlertProps {
  alertTitle: string;
  alertBody: string;
  seenClickHandler: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  alertTitle,
  alertBody,
  seenClickHandler,
}) => {
  return (
    <Alert
      action={
        <Button onClick={seenClickHandler} color="inherit" size="small">
          دیده شد
        </Button>
      }
      severity="info"
    >
      <AlertTitle>{alertTitle}</AlertTitle>
      {alertBody}
    </Alert>
  );
};

export default CustomAlert;
