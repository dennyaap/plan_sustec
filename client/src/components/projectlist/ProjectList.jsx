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


const ProjectList = observer( () => {
	const { project } = useContext (Context);
	const [ colors, setColors ] = useState ([ '#2ED47A', '#FFB946', '#F7685B' ]); //color status
	const [ statusList, setStatusList ] = useState ([
			{
				statusName: 'Выполнено',
				statusValue: 0
			},
			{
				statusName: 'Активно',
				statusValue: 1
			},
			{
				statusName: 'Завершено',
				statusValue: 2
			}
		]);

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
			{project.projects.map((project) => (
				<TableRow
				key={project.name}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
				>
				<TableCell align="center" component="th" scope="row">
					{project.name}
				</TableCell>
				<TableCell align="center">{project.createdAt}</TableCell>
		
				<TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<StatusSelect colors={colors} statusList={statusList} />
				</TableCell>
				</TableRow>
			))}
			</TableBody>
		</Table>
		</TableContainer>
	);
});

export default ProjectList;
