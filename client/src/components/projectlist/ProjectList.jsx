import { useContext, useState } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import StatusSelect from '../select/StatusSelect';
import { changeStatus } from '../../http/projectAPI';


const ProjectList = observer( () => {
	const { project } = useContext (Context);

	const changeProjectStatus = (data) => {
		changeStatus(data);
		console.log(data)
	}

	return (
		<TableContainer component={ Paper }>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
			<TableRow>
				<TableCell align="center">Название</TableCell>
				<TableCell align="center">Дата создания</TableCell>
				<TableCell align="center">Статус</TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{project.projects.map(( project ) => (
				<TableRow
				key={ project.name }
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				<TableCell align="left" component="th" scope="row">
					{ project.name }
				</TableCell>
				<TableCell align="center">{ project.createdAt }</TableCell>
		
				<TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<StatusSelect projectId={ project.id } statusId={ project.statusId } changeProjectStatus={changeProjectStatus}/>
				</TableCell>
				</TableRow>
			))}
			</TableBody>
		</Table>
		</TableContainer>
	);
});

export default ProjectList;
