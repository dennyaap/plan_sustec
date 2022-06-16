import { useState, useContext, useEffect } from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box } from '@mui/material';
import Context from '../../index';


const RoleSelect = ({isDisabled, roleId}) => {
	const { project } = useContext( Context );
	const [ currentRole, setRole ] = useState(roleId);

	const changeStatus = (e) => {
		// let statusId = e.target.value;
		// setStatus(statusId);
		// changeProjectStatus({ projectId , statusId })
	}

    return (
        <Box sx={{ width: 140, }}>
            <FormControl fullWidth>
            <Select
                    value={currentRole}
                    onChange={(e) => setRole(e.target.value)}
                    variant='standard'
                    align='center'
                    sx={{
                        // backgroundColor: project.statuses[currentStatus - 1].color,
                        borderRadius: 60,
                        width: 160,
                        height: 40,
                    }}
					disabled={isDisabled}
                >
                    {
                       project.roles.map(({ name, id}) => (
                            <MenuItem key={ name } value={ id }>{ name }</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
export default RoleSelect;
