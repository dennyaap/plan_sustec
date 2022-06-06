import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Sidebar } from './sidebar/Sidebar';
import { DrawerHeader } from './drawer/Drawer';

import Context from '../index';
import { observer } from 'mobx-react-lite';
import { authRoutes } from '../routes';


const AppRouter = observer ( () => {
  const { user } = useContext(Context);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
                {user.isAuth && authRoutes.map( ({path, Component}) =>
                    <Route key={path} path={path} element={<Component />}/>
                )}
                
                <Route path="*" element={<Navigate to="/task"/>}/>
        </Routes>
      </Box>
    </Box>
  );
})

export default AppRouter;