import { useState, useContext, useEffect } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import Context from '../../index';
import { COLORS } from '../../consts/consts';


export default function StatusSelect({ projectId, statusId, changeProjectStatus }) {
	const { project } = useContext( Context );
	const [ currentStatus, setStatus ] = useState(statusId);

	const changeStatus = (e) => {
		let statusId = e.target.value;
		setStatus(statusId);
		changeProjectStatus({ projectId , statusId })
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
                        fontSize:'14px',
                        color: COLORS.WHITE,
                        '&:before': {
                            display:'none'
                        },
                        '&:after': {
                            display:'none'
                        },
						'&:hover': {
							opacity: '0.9'
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
