import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Sidebar } from './sidebar/Sidebar';
import { DrawerHeader } from './drawer/Drawer';
import {TaskDialogButton} from './createDialogTaskButton/TaskDialogButton';

import Context from '../index';
import { observer } from 'mobx-react-lite';
import { authRoutes, publicRoutes } from '../routes';


const AppRouter = observer ( () => {
  const { user } = useContext(Context);

  return user.isAuth ? (
    <Box sx={{ display: 'flex' }}>
      
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <TaskDialogButton/>
        <Routes>
                {authRoutes.map( ({path, Component}) =>
                    <Route key={path} path={path} element={<Component />}/>
                )}
                
                <Route path="*" element={<Navigate to="/projects"/>}/>
        </Routes>
      </Box>
    </Box>
  ) : (
	  <Routes>
		  {publicRoutes.map(({ path, Component }) => 
				<Route key={path} path={path} element={<Component />}/>
			)}
			<Route path="*" element={ <Navigate to='/login' />} />
	  </Routes>
  );
})

export default AppRouter;