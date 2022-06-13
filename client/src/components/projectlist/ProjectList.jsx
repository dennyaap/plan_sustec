import { useContext } from 'react';
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
import Project from '../project/Project';

const ProjectList = observer( ({ setSelectedProject, openModal }) => {
	const { project } = useContext(Context);

	return (
		<TableContainer component={ Paper }>
		<Table sx={{ minWidth: 650 }} aria-label="simple table">
			<TableHead>
			<TableRow>
				<TableCell align="center">№</TableCell>
				<TableCell align="left">Название</TableCell>
				<TableCell align="center">Дата создания</TableCell>
				<TableCell align="center">Статус</TableCell>
				<TableCell align="center"></TableCell>
			</TableRow>
			</TableHead>
			<TableBody>
			{ project.projects.map(( project, index ) => 
				<Project 
					key={ project.id } 
					project={ project } 
					index={ index } 
					openModal={ openModal }
					setSelectedProject={ setSelectedProject }
				/>)}
			</TableBody>
		</Table>
		</TableContainer>
	);
});

export default ProjectList;
