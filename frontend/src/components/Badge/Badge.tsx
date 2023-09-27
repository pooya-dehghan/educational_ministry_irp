import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';

interface CustomBadgeProps {
  messages: number;
  onClickHandler: () => void;
}

const CustomBadge: React.FC<CustomBadgeProps> = ({
  messages,
  onClickHandler,
}) => {
  return (
    <IconButton color="inherit" onClick={onClickHandler}>
      <Badge badgeContent={messages} color="error">
        <MailIcon color="inherit" />
      </Badge>
    </IconButton>
  );
};

export default CustomBadge;
