import React from 'react';
import { Box } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HowToReg from '@mui/icons-material/HowToReg';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SchoolIcon from '@mui/icons-material/School';
import { ListItemIcon } from '@mui/material';
import styles from './SideBar.module.css';
import { Link, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import  ListItems from './side-bar-list';

interface propsTypes {
  open: boolean | undefined;
  handleDrawerToggle: () => void;
}

const SideBar: React.FC<propsTypes> = ({ open, handleDrawerToggle }) => {
  const { pathname } = useLocation();
  return (
    <Box component={'div'}>
      <Drawer anchor="right" open={open} onClose={handleDrawerToggle}>
        <IconButton
          aria-label="close open"
          onClick={() => handleDrawerToggle()}
          color="primary"
        >
          <OpenInFullIcon />
        </IconButton>
        <Divider />
        {ListItems.map((list) => {
          return (
            <ListItem
              component={Link}
              to={`${pathname}/${list.to}`}
              key={'information'}
              disablePadding
            >
              <ListItemButton>
                <ListItemText
                  className={styles.listItemText}
                  primary={list.list}
                />
                <ListItemIcon style={{ justifyContent: 'right' }}>
                  {list.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          );
        })}
      </Drawer>
    </Box>
  );
};

export default SideBar;
