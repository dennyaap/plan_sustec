import { useState } from 'react';
import Box from '@mui/material/Box';

import Appbar from '../appbar/AppBar';
import Drawer from '../drawer/Drawer';


export const Sidebar = () => {
    const [open, setOpen] = useState(false);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Appbar open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Drawer open={open} handleDrawerClose={handleDrawerClose}/>
        </Box>
    )
}