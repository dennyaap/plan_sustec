import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import StatusSelect from '../select/StatusSelect';
import { PROJECT_STATUSES } from '../../consts/consts';
import { changeStatus } from '../../http/projectAPI';
import IconButton from '@mui/material/IconButton';
import IconDelete from '@mui/icons-material/Delete';


const Project = ({ project, index, openModal, setSelectedProject }) => {
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

	const selectProject = (selectedProject) => {
		setSelectedProject(selectedProject);
		openModal();
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
				<TableCell align="left" sx={{color: '#323C47', fontWeight: 500}}>
					{ project.name }
				</TableCell>
				<TableCell align="center" sx={{color: '#707683', fontWeight: 500}}>
					 { parseDate(project.createdAt)} 
				</TableCell>
				<TableCell sx={{display: 'flex', justifyContent: 'center'}}>
					<StatusSelect 
						projectId={ project.id } 
						statusId={ project.statusId } 
						changeProjectStatus={ changeProjectStatus }
					/>
				</TableCell>
				<TableCell>
					<IconButton sx={{ color: '#FE5B5B' }} onClick={ () => selectProject( project ) }>
						<IconDelete/>
					</IconButton>
				</TableCell>
		</TableRow>
	);
}

export default Project;
