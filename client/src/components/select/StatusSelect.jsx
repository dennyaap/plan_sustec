import { useState, useContext, useEffect } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import Context from '../../index';


export default function StatusSelect({ projectId, statusId, changeProjectStatus }) {
	const { project } = useContext( Context );
	const [ currentStatus, setStatus ] = useState(statusId);

	const changeStatus = (e) => {
		setStatus(e.target.value);
		changeProjectStatus({projectId ,statusId: e.target.value}) //выводит 2 - так и должно быть
	}

    return (
        <Box sx={{ width: 140, }}>
            <FormControl fullWidth>
            <Select
                    value={currentStatus}
                    onChange={changeStatus}
                    variant='standard'
                    align='center'
                    sx={{
                        backgroundColor: project.statuses[currentStatus - 1].color,
                        borderRadius: 60,
                        width: 160,
                        height: 40,
                        color: '#fff',
                        '&:before': {
                            display:'none'
                        },
                        '&:after': {
                            display:'none'
                        },
                    }}
                >
                    {
                       project.statuses.map(({ name, id}) => (
                            <MenuItem key={ name } value={ id }>{ name }</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
