import { useState } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';

export default function StatusSelect({ colors, statusList }) {

    const [status, setStatus] = useState(0);

    const changeStatus = (event) => {
        setStatus(event.target.value);
    }
	const changeColor = (status) => {
		return colors[status]
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
                       statusList.map(({ statusName, statusValue}) => (
                            <MenuItem key={statusName} value={statusValue}>{statusName}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
