import * as React from 'react';
import { Divider, Grid } from '@mui/material';
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
import { logout } from '../../features/auth/authSlice';
import * as tokenHandler from '../../utils/token/index';
import * as userInfoLocalStorage from '../../utils/storageUser/index';
import { updateResponse } from '../../features/response/responseSlice';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface PageWrapper {
  children?: ReactNode;
}

interface ImageData {
  name: string;
  imageUrl: string;
}

const Dashboard: React.FC<PageWrapper> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({
    username: 'وارد نشده است',
    id: 0,
    type: 'وارد نشده است',
  });
  const navigate = useNavigate();
  const [imgNum, setImgNum] = useState(0);

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
  useEffect(() => {
    setUserInfo(userInfoLocalStorage.getUserInfo());
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
    navigate(`/dashboard/${userInfo.type}/${userInfo.id}`);
  };

  const profileClick = () => {
    navigate('/dashboard/profile');
  };

  const logOutClick = () => {
    tokenHandler.removeToken();
    tokenHandler.removeRefreshToken();
    userInfoLocalStorage.removeUserInfo();
    dispatch(logout());
    dispatch(
      updateResponse({
        severity: 'warning',
        message: 'شما با موفقیت از سامانه خارج شدید.',
        open: true,
      })
    );
    navigate('/login');
  };

  const imageDataSet: ImageData[] = [
    {
      name: 'Image 0',
      imageUrl:
        'https://uploadkon.ir/uploads/4d9504_2336985c2cbca64ee7b8eb5ba048c7bd92-ei-1649215445587.jpg',
    },
    {
      name: 'Image 1',
      imageUrl: 'https://uploadkon.ir/uploads/0d8804_23Daneshgah-Rajaee1.jpg',
    },
    {
      name: 'Image 2',
      imageUrl: 'https://uploadkon.ir/uploads/009f04_23Srttu-winter-1394.jpg',
    },
    {
      name: 'Image 3',
      imageUrl:
        'https://uploadkon.ir/uploads/6eae04_23دانشگاه-تربیت-دبیر-شهید-رجایی.png',
    },
  ];

  const nextIconClick = () => {
    if (imgNum == 3) {
      setImgNum(0);
    } else setImgNum(imgNum + 1);
  };
  const backIconClick = () => {
    if (imgNum == 0) {
      setImgNum(3);
    } else setImgNum(imgNum - 1);
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
                  {`کاربر گرامی : ${userInfo.username} `}
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
        <Grid
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              display: 'flex',
              backgroundColor: 'white',
              width: '1000px',
              height: '450px',
              marginTop: '50px',
              boxShadow: '5px 5px 10px',
              '@media (max-width:1000px)': {
                width: '90%',
              },
              '@media (max-width: 550px)': {
                flexDirection: 'column',
                justifyContent: 'center',
                width: '90%', // Full width on mobile
                height: 'auto', // Auto height on mobile
              },
            }}
          >
            <Grid
              container
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'black',
              }}
            >
              <img
                style={{ height: '410px', width: '500px', maxWidth: '100%' }}
                src={imageDataSet[imgNum].imageUrl}
              />

              <div style={{ display: 'flex' }}>
                <IconButton sx={{ color: 'white' }} onClick={nextIconClick}>
                  <ArrowForwardIosIcon />
                </IconButton>
                <IconButton sx={{ color: 'white' }} onClick={backIconClick}>
                  <ArrowBackIosIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              sx={{ backgroundColor: 'rgb(150,237,237)' }}
            >
              <Grid item margin="30px" marginBottom="0px">
                <h3 style={{ textAlign: 'center' }}>
                  کاربر گرامی، به سامانه مدیریت کارورزی دانشگاه شهید رجایی خوش
                  آمدید
                </h3>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Divider
                  sx={{
                    backgroundColor: 'black',
                    width: '90%',
                  }}
                />
              </Grid>
              <Grid display="flex" alignItems="center" justifyContent="center">
                <Box
                  sx={{
                    width: '80%',
                    height: 'auto',
                    borderRadius: '10px',
                    border: '1px solid black',
                    padding: '10px',
                    margin: '30px',
                    textAlign: 'center',
                    backgroundColor: 'red',
                  }}
                >
                  <Typography color="white">
                    در بخش داشبور می توانید با انتخاب گزینه مناسب، کار خود را
                    انجام دهید.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
