import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import './style.css';
import { COLORS } from '../../consts/consts';
import { observer } from 'mobx-react-lite';
import Context from '../../index';


const SortStatus = observer (({ currentSortStatus, changeSortStatus }) => {
    const { project } = useContext(Context)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', px:1 }}>
            <Typography sx={{ height: '100%', fontSize: '14px', color: COLORS.DARK_GREY }}>Статус:</Typography>
            <FormControl fullWidth sx={{
                marginLeft: '8px',
                marginTop:'2px'
                }}>
                <Select
                    id="ss"
                    variant='standard'
                    align='center'
                    displayEmpty
                    defaultValue={currentSortStatus}
                    value={currentSortStatus}
                    onChange={(e) => changeSortStatus(e.target.value)}
                    sx={{
                        '&:before': {
                            display: 'none',
                        },
                        '&:after': {
                            display: 'none',
                        },
                        '&:hover': {
                            opacity: '0.9',
                        },
                        color: COLORS.BLUE,
                        fontSize: '14px',
                        appearance: 'none',
                    }}
                >
                    <MenuItem key={'Все'} value={''}>Все</MenuItem>
                    {
                    project.statuses.map(({ id, name }) => (
                            <MenuItem key={name} value={id}>{name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
});

export default SortStatus;