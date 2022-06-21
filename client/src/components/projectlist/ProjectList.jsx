import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Context from '../../index';
import Project from '../project/Project';
import { COLORS, PROJECT_TITLES } from '../../consts/consts';

const ProjectList = observer(({ setSelectedProject, openModal, openModalEdit, offsetProjects }) => {
	const { project } = useContext(Context);

	return (
		<TableContainer component={Paper} sx={{boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)'}}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						{
							PROJECT_TITLES.map(({ nameCell }) => (
								<TableCell key={nameCell} align={'center'} sx={{ color: COLORS.LIGHT_BLUE, letterSpacing: 1, fontSize:'13px' }}>{ nameCell }</TableCell>
							))
						}
					</TableRow>
				</TableHead>
				<TableBody>
					{project.projects.map((project, index) =>
						<Project
							key={project.id}
							project={project}
							index={offsetProjects++}
							openModal={openModal}
							openModalEdit={openModalEdit}
							setSelectedProject={setSelectedProject}
						/>)}
				</TableBody>
			</Table>
		</TableContainer>
	);
});

export default ProjectList;
