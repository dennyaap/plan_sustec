import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Context from '../index';
import { observer } from 'mobx-react-lite';
import { authRoutes } from '../routes';

import { SideBar, DrawerHeader } from '../components/sidebar/SideBar';
import { Box, Container } from '@mui/system';


const AppRouter = observer (() => {
    const { user } = useContext(Context);
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Routes>
                {user.isAuth && authRoutes.map( ({path, Component}) =>
                    <Route key={path} path={path} element={<Component />}/>
                )}
                <Route path="*" element={<Navigate to="/task"/>}/>
            </Routes>
        </Box>
    )
})
export default AppRouter;