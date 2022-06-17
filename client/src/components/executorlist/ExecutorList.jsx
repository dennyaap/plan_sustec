import { useContext } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import RoleSelect from '../roleselect/RoleSelect';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Context from '../../index';


const ExecutorList = ({ executors, deleteExecutor }) => {
	const { user } = useContext(Context);
	
	return (
		<TableContainer component={Paper} >
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Сотрудник</TableCell>
							<TableCell>Роль</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ executors.map( executor =>
							<TableRow
								key={executor.userId}
							>
								<TableCell sx={{ color: executor.userId === user.currentUser.id ? '#32E182' : '#109CF1'}}>{executor.fullName}</TableCell>
								<TableCell><RoleSelect isDisabled={executor.userId === user.currentUser.id} roleId={executor.roleId}/></TableCell>
								<TableCell>
									<IconButton sx={{ color: '#FE5B5B', display: executor.userId === user.currentUser.id ? 'none' : '' }} onClick={() => deleteExecutor(executor.userId)}>
										<CancelIcon/>
									</IconButton>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
	);
}

export default ExecutorList;
