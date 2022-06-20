import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';
import Context from '../../index';
import Project from '../project/Project';
import { COLORS, PROJECT_TITLES } from '../../consts/consts';

const ProjectList = observer(({ setSelectedProject, openModal, openModalEdit, isLoading }) => {
	const { project } = useContext(Context);

	if (isLoading) {
		return <SpinnerLoader />
	}

	return (
		<TableContainer component={Paper}>
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
							index={index}
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
