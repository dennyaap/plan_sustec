import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import StatusSelect from '../select/StatusSelect';
import { COLORS, PROJECT_STATUSES } from '../../consts/consts';
import { changeStatus } from '../../http/projectAPI';
import IconButton from '@mui/material/IconButton';
import IconDelete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Project = ({ project, index, openModal, openModalEdit, setSelectedProject }) => {
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
	
	const selectEditProject = (selectedProject) => {
		setSelectedProject(selectedProject);
		openModalEdit();
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
				<TableCell align="center" sx={{color: COLORS.DARK_BLUE, fontWeight: 500, fontSize:'15px'}}>
					{ project.name }
				</TableCell>
				<TableCell align="center" sx={{color: COLORS.DARK_GREY, fontWeight: 500, fontSize:'13px'}}>
					 { parseDate(project.createdAt)} 
				</TableCell>
				<TableCell sx={{display: 'flex', justifyContent: 'center'}}>
					<StatusSelect 
						projectId={ project.id } 
						statusId={ project.statusId } 
						changeProjectStatus={ changeProjectStatus }
					/>
				</TableCell>
				<TableCell align='center'>
					<IconButton onClick={ () => selectEditProject( project ) } >
						<EditIcon sx={{width:'20px',height:'20px'}}/>
					</IconButton>
				</TableCell>
				<TableCell align='center'>
					<IconButton sx={{ color: COLORS.RED }} onClick={ () => selectProject( project ) }>
						<IconDelete sx={{width:'20px',height:'20px'}}/>
					</IconButton>
				</TableCell>
		</TableRow>
	);
}

export default Project;
