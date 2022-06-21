import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { COLORS } from '../../consts/consts';


const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
	backgroundColor: COLORS.WHITE,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Appbar = ({ open, handleDrawerOpen }) => {
    return (
        <AppBar position="fixed" open={open}>
                
                <Toolbar>
                
                <IconButton 
                
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography noWrap component="div" sx={{color: COLORS.BLUE, fontSize: 18, fontWeight: 600, letterSpacing: 1}}>
                Plan Sustec
                </Typography>
                <IconButton sx={{color: COLORS.BLUE, position:'absolute', right:10}}><NotificationsIcon/></IconButton>
                </Toolbar>
            </AppBar>
    );
}

export default Appbar;
