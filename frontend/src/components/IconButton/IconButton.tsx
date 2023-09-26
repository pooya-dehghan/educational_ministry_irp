import React, { ReactNode } from 'react';
import IconButton from '@mui/material/IconButton';
import ArchiveIcon from '@mui/icons-material/Archive';

interface IconButtonProps {
  children: ReactNode;
  clickHandler: () => void;
  text: string;
}

const CustomIconButton: React.FC<IconButtonProps> = ({
  children,
  text,
  clickHandler,
}) => {
  return (
    <>
      <IconButton
        onClick={() => clickHandler()}
        color="inherit"
        aria-label="add to shopping cart"
      >
        <ArchiveIcon />
      </IconButton>
    </>
  );
};

export default CustomIconButton;
