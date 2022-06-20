import { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import RoleSelect from '../roleselect/RoleSelect';
import ExecutorList from '../executorlist/ExecutorList';
import { findUser } from '../../http/userAPI';
import Context from '../../index';
import { COLORS } from '../../consts/consts';
import { updateProject } from '../../http/projectAPI';



const ModalEdit = ({isOpenModalEdit, closeModalEdit, setSelectedProject, selectedProject, editProject}) => {
	const [ hashtag, setHashtag ] = useState('#');
	const { user } = useContext(Context);
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ deletedExecutors, setDeletedExecutors ] = useState([]);
	const [ executors, setExecutors ] = useState([]);
	const [ executorRoles, setExecutorRoles ] = useState([]);

	const editCurrentProject = () => {
		if(selectedProject.name.length === 0){
			setErrorMessage('Введите название проекта')
		} else {
			editProject({projectId: selectedProject.id, projectName: selectedProject.name, executors, deletedExecutors, executorRoles});
			closeModalEdit(false);
		}
	}

	const addDeletedExecutors = (executorId) => {
		setDeletedExecutors([...deletedExecutors, executorId]);
		setSelectedProject({...selectedProject, project_executors: [selectedProject.project_executors.find( (executor) => executor.id !== executorId)]})
	}

	const addExecutor = async () => {
		try{
			const data = await findUser(hashtag.replace(/^./, ''));
			if(data.userId !== user.currentUser.id) {
				if(!selectedProject.project_executors.find(executor => executor.userId === data.userId)){
					setSelectedProject({...selectedProject, project_executors: [...selectedProject.project_executors, { userId: data.userId, fullName: data.fullName, roleId: 2 }] });
					setExecutors([...executors, { userId: data.userId, fullName: data.fullName, roleId: 2 }]);
					setErrorMessage('');
				} else {
					setErrorMessage('Такой сотрудник уже состоит в проекте')
				}
			} else {
				setErrorMessage('Вы уже принимаете участие в проекте')
			}
			
		} catch(e) {
			setErrorMessage(e.response.data.message);
		}
	}
	const editExectutorRole = ({executorId, roleId}) => {
		setExecutorRoles([...executorRoles, { userId: executorId, roleId }]);
	}
	return (
		<Dialog open={ isOpenModalEdit } onClose={closeModalEdit} fullWidth={true}>
		<DialogTitle>Редактирование проекта</DialogTitle>
		<DialogContent dividers>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Название проекта"
				type="text"
				fullWidth
				variant="standard"
				onInput={(e) => setSelectedProject({...selectedProject, name: e.target.value})}
				value={selectedProject.name}
			/>
			
			<Box sx={{marginBottom: 3, marginTop: 3}}>
				<Typography>Исполнители</Typography>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="#хэштег"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setHashtag(e.target.value)}
						value={hashtag}
					/>
					<Button variant="outlined" onClick={addExecutor} sx={{textTransform: 'none', letterSpacing: 1}}>Добавить</Button>
				</Box>
			
			</Box>
			<Alert severity="error" sx={{display: errorMessage ? '' : 'none', marginBottom: 2}}>{errorMessage}</Alert>
			<ExecutorList executors={selectedProject.project_executors} deleteExecutor={addDeletedExecutors} editExecutorRole={editExectutorRole}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={closeModalEdit} sx={{textTransform: 'none', letterSpacing: 1}}>Закрыть</Button>
			<Button onClick={() => editCurrentProject()} variant="contained" sx={{ background: COLORS.BLUE, textTransform: 'none', letterSpacing: 1}}>Редактировать</Button>
		</DialogActions>
	</Dialog>
	);
}

export default ModalEdit;
