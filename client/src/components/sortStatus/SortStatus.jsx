import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import './style.css';


export default function SortStatus() {
    const [currentChoise, setChoise] = React.useState('');

    const handleChange = (event) => {
        setChoise(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', px:1 }}>
            <Typography sx={{ height: '100%', fontSize: '14px' }}>Статус:</Typography>
            <FormControl fullWidth sx={{
                marginLeft: '8px',
                marginTop:'2px'
                }}>
                <Select
                    id="ss"
                    variant='standard'
                    align='center'
                    displayEmpty
                    value={currentChoise}
                    onChange={handleChange}
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
                        color:'#109CF1',
                        fontSize: '14px',
                        appearance: 'none',
                    }}
                >
                    {
                        [
                            {
                                id: 1,
                                name: 'Все'
                            },
                            {
                                id: 2,
                                name: 'Активные'
                            },
                            {
                                id: 3,
                                name: 'Выполненные'
                            }
                        ].map(({ id, name }) => (
                            <MenuItem key={name} value={id}>{name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    );
}