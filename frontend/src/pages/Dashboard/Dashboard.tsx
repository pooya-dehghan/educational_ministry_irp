import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, ReactNode } from "react";
import styles from "./Dashboard.module.css";
import SideBar from "../../components/SideBar/SideBar";

interface PageWrapper {
  children?: ReactNode;
}

const Dashboard: React.FC<PageWrapper> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <>
      <Box component={"div"}>
        <SideBar
          open={drawerOpen}
          handleDrawerToggle={() => setDrawerOpen(!drawerOpen)}
        />
        {children}
      </Box>
    </>
  );
};

export default Dashboard;
