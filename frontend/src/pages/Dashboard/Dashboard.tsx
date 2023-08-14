import * as React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, ReactNode } from "react";
import styles from "./Dashboard.module.css";
import SideBar from "../../components/SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { dashboardAsync } from "../../features/dashboard/dashboardThunk";
import { RootState } from "../../store/store";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

interface PageWrapper {
  children?: ReactNode;
}

const Dashboard: React.FC<PageWrapper> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (user) {
  //     const dashboardData = {
  //       username: user.username,
  //       password: user.password,
  //     };
  //     (dispatch as any)(dashboardAsync(dashboardData))
  //       .unwrap()
  //       .then((response: any) => {
  //         dispatch(response.user);
  //       })
  //       .catch((error: any) => {});
  //   }
  // }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box component={"div"}>
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
                  sx={{ justifyContent: "left" }}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1, textAlign: "left" }}>
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
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid container direction={"column"}>
            <Grid item>{children}</Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
