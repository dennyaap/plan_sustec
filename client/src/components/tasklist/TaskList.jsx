import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Task from '../task/Task';
import { COLORS, TASK_TITLES } from '../../consts/consts';
import { Box, Typography } from '@mui/material';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';

import { motion, AnimatePresence } from 'framer-motion';

const container = {
	hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 }},
	show: {
		transition: { staggerChildren: 0.02, delayChildren: 0.1 }
	}
};

const TaskList = observer(({ setSelectedTask, openModal, openModalEdit, offsetTasks, isLoading, alertMessage, tasks }) => {
	return (
		<Box>			
			<TableContainer 
				component={Paper} sx={{boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)', overflow: 'hidden', background: 'none'}} 
			>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead sx={{ background: '#fff'}}>
					<TableRow>
						{
							TASK_TITLES.map(({ nameCell }) => (
								<TableCell key={nameCell} align={'center'} sx={{ color: COLORS.LIGHT_BLUE, letterSpacing: 1, fontSize:'13px' }}>{ nameCell }</TableCell>
							))
						}
					</TableRow>
				</TableHead>
				{tasks.length !== 0 && <TableBody 
				component={motion.tbody}
				variants={container}
				initial='hidden'
				animate='show'
				>
					<AnimatePresence >
						{tasks.map((task, index) =>
						<Task 
							key={task.id}
							task={task}
							index={offsetTasks++}
							openModal={openModal}
							openModalEdit={openModalEdit}
							setSelectedTask={setSelectedTask}
						/>)}
					</AnimatePresence>
				</TableBody>}
			</Table>
		</TableContainer>
		{isLoading && <Box sx={{display: 'flex', justifyContent: 'center'}}><SpinnerLoader animation={ 'border' } style={{ marginTop: 20, width: 75, height: 75, color: COLORS.BLUE }}/></Box>}
		{alertMessage && <Typography sx={{color: COLORS.DARK_GREY, display: 'flex', justifyContent: 'center', fontSize: 18, marginTop: 5, letterSpacing: 1}}>{ alertMessage }</Typography>}
		</Box>
	);
});

export default TaskList;
