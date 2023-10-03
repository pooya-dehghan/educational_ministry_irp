import * as React from 'react';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect, ReactNode } from 'react';
import styles from './Dashboard.module.css';
import SideBar from '../../components/SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardAsync } from '../../features/dashboard/dashboardThunk';
import { RootState } from '../../store/store';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomBadge from '../../components/Badge/Badge';
import Notification from '../Notifications/Notifications';
import { getAllNotificationsAsync } from '../../features/notifications/notificationThunk';

interface PageWrapper {
  children?: ReactNode;
}

const Dashboard: React.FC<PageWrapper> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      (dispatch as any)(dashboardAsync())
        .unwrap()
        .then((response: any) => {})
        .catch((error: any) => {});
    }
  }, []);

  useEffect(() => {
    let unSeen = true;
    (dispatch as any)(getAllNotificationsAsync({ unSeen }))
      .unwrap()
      .then((response: any) => {
        setNotifications(response);
      })
      .catch((error: any) => {});
  }, []);
  const removeNotifById = (id: number) => {
    setNotifications((prevState) =>
      prevState.filter((notif: any) => notif.id !== id)
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountClick = () => {
    navigate(`/dashboard/${user.usertype}/${user.id}`);
  };

  const profileClick = () => {
    navigate('/dashboard/profile');
  };

  const logOutClick = () => {
    alert('you have been loged out');
  };

  return (
    <>
      <Box component={'div'} className={styles.container}>
        <SideBar
          open={drawerOpen}
          handleDrawerToggle={() => setDrawerOpen(!drawerOpen)}
        />
        <Grid container direction="column">
          <Grid className={styles.menuContainer} item>
            <AppBar position="static" className={styles.appbar}>
              <Toolbar>
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <MenuIcon />
                </IconButton>

                <Typography sx={{ flexGrow: 1, textAlign: 'right' }}>
                  ادمین کل
                </Typography>
                {auth && (
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={accountClick}>
                        <AccountCircle />
                        حساب کاربری
                      </MenuItem>
                      <MenuItem onClick={profileClick}>
                        <SettingsIcon />
                        تنظیمات
                      </MenuItem>
                      <MenuItem onClick={logOutClick}>
                        <LogoutIcon />
                        خروج از حساب کاربری
                      </MenuItem>
                    </Menu>
                  </div>
                )}
                <CustomBadge
                  onClickHandler={() => {
                    setNotificationOpen(!notificationOpen);
                  }}
                  messages={notifications?.length}
                />
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid container direction={'column'}>
            <Grid item>{children}</Grid>
          </Grid>
          <Grid>
            {notificationOpen && (
              <Notification
                removeNotifById={removeNotifById}
                notifications={notifications}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
