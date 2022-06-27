import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TaskStatus from '../taskStatus/TaskStatus';
import { COLORS, PROJECTS_ROUTE, PROJECT_STATUSES, TASKS_ROUTE } from '../../consts/consts';
import { changeStatus } from '../../http/projectAPI';
import IconButton from '@mui/material/IconButton';
import IconDelete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import DatePicker from '../datePicker/DatePicker';


const child = {
	hidden: { 
		x: -80,
	},
    show: { 
		x: 0, 
		transition: { type: "spring", stiffness: 85 } ,
	}
};

const Task = ({ task, index, openModal, openModalEdit, setSelectedTask}) => {
	const [ backgroundColorStatus, setBackgroundColor ] = useState('');
	const [ taskStatus, setTaskStatus ] = useState(task.statusId);

	const navigate = useNavigate();

	const changeTaskStatus = (data) => {
		setTaskStatus(data.statusId);
		changeStatus(data);
	}
	const changeBackgroundColor = () => {
		setBackgroundColor(PROJECT_STATUSES.find(status => status.id === taskStatus).color);
	}
	useEffect( () => {
		changeBackgroundColor()
	}, [taskStatus])

	const parseDate = (date) => {
		let parsedDate = new Date(date);
		return parsedDate.toLocaleDateString();
	}

	const selectTask = (selectedTask) => {
		setSelectedTask(selectedTask);
		openModal();
	}
	
	const selectEditTask = (selectedTask) => {
		setSelectedTask(selectedTask);
		openModalEdit();
	}


	return (
		<TableRow
				component={motion.tr}
				variants={child}
				exit={{ scale: 1.1, x: 0, opacity: 0 }}
				whileHover={{ scale: 1.01 }}
				sx={{ 
					cursor: 'pointer',
					'&:last-child td, &:last-child th': { border: 0 },
					backgroundColor: backgroundColorStatus,
					transition: 'all 0.05s ease-in-out',
					background: '#fff'
				}}
				>
				<TableCell align="center" component={motion.td}>
					{ index + 1 }
				</TableCell>
				<TableCell align="center" sx={{color: COLORS.DARK_BLUE, fontWeight: 500, fontSize:'15px'}} onClick={ () => navigate(PROJECTS_ROUTE + '/' + task.id + TASKS_ROUTE)}>
					{ task.name }
				</TableCell>
                <TableCell align="center" sx={{color: COLORS.DARK_GREY, fontWeight: 500, fontSize:'13px'}}>
					  <DatePicker completedDate={parseDate(task.dateCompletion)}/>
				</TableCell>
				<TableCell align="center" sx={{color: COLORS.DARK_GREY, fontWeight: 500, fontSize:'13px'}}>
					 { parseDate(task.createdAt)} 
				</TableCell>
				<TableCell sx={{display: 'flex', justifyContent: 'center'}}>
					<TaskStatus 
						taskId={ task.id } 
						statusId={ task.statusId } 
						changeTaskStatus={ changeTaskStatus }
					/>
                    
				</TableCell>
				<TableCell align='center'>
					<IconButton onClick={ () => selectEditTask( task ) } >
						<EditIcon sx={{width:'20px',height:'20px'}}/>
					</IconButton>
				</TableCell>
				<TableCell align='center'>
					<IconButton sx={{ color: COLORS.RED }} onClick={ () => selectTask( task ) }>
						<IconDelete sx={{width:'20px',height:'20px'}}/>
					</IconButton>
				</TableCell>
		</TableRow>
	);
}

export default Task;
