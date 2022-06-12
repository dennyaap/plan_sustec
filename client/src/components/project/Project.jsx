import { useState, useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import StatusSelect from '../select/StatusSelect';
import { PROJECT_STATUSES } from '../../consts/consts';
import { changeStatus } from '../../http/projectAPI';

const Project = ({ project, index }) => {
	const [ backgroundColorStatus, setBackgroundColor ] = useState('');
	const [ projectStatus, setProjectStatus ] = useState(project.statusId);

	const changeProjectStatus = (data) => {
		setProjectStatus(data.statusId);
		changeStatus(data);
	}
	const changeBackgroundColor = () => {
		setBackgroundColor(PROJECT_STATUSES.find(status => status.id === projectStatus).color);
	}
	useEffect( () => {
		changeBackgroundColor()
	}, [projectStatus])

	const parseDate = (date) => {
		let parsedDate = new Date(date);
		return parsedDate.toLocaleDateString();
	}

	return (
		<TableRow
				sx={{ 
					'&:last-child td, &:last-child th': { border: 0 },
					backgroundColor: backgroundColorStatus
				}}
				>
				<TableCell align="center">
					{ index + 1 }
				</TableCell>
				<TableCell align="left">
					{ project.name }
				</TableCell>
				<TableCell align="center">
					 { parseDate(project.createdAt)} 
				</TableCell>
				<TableCell sx={{display: 'flex', justifyContent: 'center'}}>
					<StatusSelect 
						projectId={ project.id } 
						statusId={ project.statusId } 
						changeProjectStatus={changeProjectStatus}
					/>
				</TableCell>
		</TableRow>
	);
}

export default Project;
