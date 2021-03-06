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



const ModalCreate = ({ isOpen, closeModal, addProject }) => {
	const [ name, setName] = useState('');
	const [ hashtag, setHashtag ] = useState('#');
	const { user } = useContext(Context);
	const [ errorMessage, setErrorMessage ] = useState('');

	const createProject = (name) => {
		closeModal();
		addProject({name, executors});
	}
	const [ executors, setExecutors ] = useState([])

	const addExecutor = async () => {
		try{
			const data = await findUser(hashtag.replace(/^./, ''));
			if(data.userId !== user.currentUser.id) {
				if(!executors.find(executor => executor.userId === data.userId)) {
					setExecutors( [...executors, { userId: data.userId, fullName: data.fullName, roleId: 2 }] );
					setErrorMessage('');
				} else {
					setErrorMessage('Такой сотрудник уже есть')
				}
			} else {
				setErrorMessage('Вы уже принимаете участие в проекте')
			}
			
		} catch(e) {
			setErrorMessage(e.response.data.message);
		}
	}
	const deleteExecutor = (executorId) => {
		setExecutors([ executors.find( (executor) => executor.userId !== executorId) ]);
	}

	useEffect( () => {
		setExecutors( [...executors, { userId: user.currentUser.id, fullName: user.currentUser.fullName, roleId: 1 }] );
	}, [])

	return (
		<Dialog open={ isOpen } onClose={closeModal} fullWidth={true}>
		<DialogTitle>Создание проекта</DialogTitle>
		<DialogContent dividers>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Название проекта"
				type="text"
				fullWidth
				variant="standard"
				onChange={(e) => setName(e.target.value)}
				value={name}
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
				<Alert severity="error" sx={{display: errorMessage ? '' : 'none'}}>{errorMessage}</Alert>
			</Box>
			<ExecutorList executors={executors} deleteExecutor={deleteExecutor}/>
		</DialogContent>
		<DialogActions>
			<Button onClick={closeModal} sx={{textTransform: 'none', letterSpacing: 1}}>Закрыть</Button>
			<Button onClick={() => createProject(name)} variant="contained" sx={{ background: COLORS.BLUE, textTransform: 'none', letterSpacing: 1}}>Создать</Button>
		</DialogActions>
	</Dialog>
	);
}

export default ModalCreate;
