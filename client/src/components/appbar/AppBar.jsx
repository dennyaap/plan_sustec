import { useState, useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { COLORS } from '../../consts/consts';
import SearchInput from '../search/SearchInput';
import { observer } from 'mobx-react-lite';
import { fetchProjects } from '../../http/projectAPI';
import Context from '../../index';


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

const Appbar = observer(({ open, handleDrawerOpen }) => {
    const [ searchValue, setSearchValue ] = useState('');

    const { project } = useContext(Context);

    function debounce(f, ms){
      let isCooldown = false;

      return function() {
        if(isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout( () => isCooldown = false, ms);
      }
    }

    const changeSearchValue = (currentValue) => {
      project.setSearchValue(currentValue);
    }

    const debouncedFunction = debounce(changeSearchValue, 600);

  

    
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
                
                <SearchInput placeholder={'Название проекта...'} changeSearchValue={debouncedFunction}/>
              
                <IconButton sx={{color: COLORS.BLUE, position:'absolute', right:10}}><NotificationsIcon/></IconButton>
                </Toolbar>
            </AppBar>
    );
})

export default Appbar;
