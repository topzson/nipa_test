
import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  

  const toggleDrawer = (state: boolean) => (event: any) => {
    setOpenDrawer(state);
  }
  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton 
            onClick={toggleDrawer(true)} 
            edge="start" 
    
            color="inherit" 
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ticket
          </Typography>
          <Button onClick={SignOut} variant="outlined" color="inherit" style={{ marginRight: 12 }}>
            ออกจากระบบ
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}