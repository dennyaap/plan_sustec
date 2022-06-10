import { styled, useTheme } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import TaskIcon from '@mui/icons-material/Task';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutIcon from '@mui/icons-material/Logout';

import { NavLink } from 'react-router-dom';
import { PROJECTS_ROUTE, TASKS_ROUTE } from '../../consts/consts';
import { useLocation } from 'react-router-dom';


const drawerWidth = 240;

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

const DrawerStyle = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );

const Drawer = ({ open, handleDrawerClose }) => {
    const theme = useTheme();
	const location = useLocation();

    return (
        <DrawerStyle variant="permanent" open={open}>
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                {[
                    {
                        name: 'Мои проекты',
                        icon: <BusinessCenterIcon/>,
						route: PROJECTS_ROUTE
                        }, 
                    {
                        name: 'Мои задачи',
                        icon: <TaskIcon/>,
						route: TASKS_ROUTE
                        }, 
                    {
                        name: 'Сотрудники',
                        icon: <PersonIcon/>,
						route: TASKS_ROUTE
                        }
                    ].map(({name, icon, route}) => (
                    <ListItem key={name} disablePadding sx={{ display: 'block' }}>
                    <NavLink to={route} style={ { textDecoration: 'none' } }><ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
						color: location.pathname === route ? '#109CF1' : '#334D6E'
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
							color: location.pathname === route ? '#109CF1' : '#C2CFE0'
                        	}}
                        >
                        	{ icon }
                        </ListItemIcon>

                        <ListItemText 
							primary={ name } 
							sx={ { opacity: open ? 1 : 0 } } 
						/>
						
                    </ListItemButton>
					</NavLink>
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                    <ListItem key={'Настройки'} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Настройки'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                    </ListItem>
                </List>
                
                <List>
                
                    <ListItem key={'Выйти'} disablePadding sx={{ display: 'block',position:'absolute',top:260}}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
							color: '#FE5050'
                        }}
                        >
                        <LogoutIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Выйти'} sx={{ opacity: open ? 1 : 0, color: '#FE5050' }} />
                    </ListItemButton>
                    </ListItem>
                    <DrawerHeader />
                </List>
            </DrawerStyle>
    );
}

export default Drawer;
