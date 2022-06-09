import * as React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';

export default function StatusSelect() {

    const [status, setStatus] = React.useState('');

    const changeStatus = (event) => {
        setStatus(event.target.value);
        console.log(event.target.value);
    }

    const changeColor = (value) => {
        if (value === 1) {
            return '#2ED47A'
        }
        else if (value === 0) {
            return '#FFB946'
        }
        else return '#F7685B'
    }

    return (
        <Box sx={{ width: 140, }}>
            <FormControl fullWidth>
            <Select
                    value={status}
                    onChange={changeStatus}
                    variant='standard'
                    align='center'
                    sx={{
                        backgroundColor: changeColor(status),
                        borderRadius: 60,
                        width: 160,
                        height: 40,
                        color: 'white',
                        '&:before': {
                            display:'none'
                        },
                        '&:after': {
                            display:'none'
                        },
                    }}
                >
                    {
                        [
                            {
                                statusName: 'Выполнено',
                                statusValue: 1
                            },
                            {
                                statusName: 'Активно',
                                statusValue: 0
                            },
                            {
                                statusName: 'Завершено',
                                statusValue: -1
                            }
                        ].map(({ statusName, statusValue}) => (
                            <MenuItem key={statusName} value={statusValue}>{statusName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
