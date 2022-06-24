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
import { Box, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';
import ListHeader from '../../components/listheader/ListHeader';
import useElementOnScreen from '../../hooks/useElementOnScreen';



const ProjectList = observer(({ setSelectedProject, openModal, openModalEdit, offsetProjects, countPages, currentPage, changePage, isLoading, alertMessage, addProject, currentSortStatus, changeSortStatus, setCurrentPage}) => {
	const { project } = useContext(Context);

	const options = {
		rootMargin: '0px',
		threshold: 0.1
	}

	const [ containerRef, isVisible ] = useElementOnScreen(currentPage, countPages, setCurrentPage, isLoading, options);
	
	return (
		<Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
			<ListHeader addProject={ addProject } currentSortStatus={currentSortStatus} changeSortStatus={changeSortStatus}/>
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
		{isLoading && <Box sx={{display: 'flex', justifyContent: 'center'}}><SpinnerLoader animation={ 'border' } style={{ marginTop: 20, width: 75, height: 75, color: COLORS.BLUE }}/></Box>}
		{alertMessage && <Typography sx={{color: COLORS.DARK_GREY, display: 'flex', justifyContent: 'center', fontSize: 18, marginTop: 5, letterSpacing: 1}}>{ alertMessage }</Typography>}
		<Stack sx={{marginTop: 5}}>
			<Pagination count={countPages} page={currentPage} onChange={changePage}/>
		</Stack>
		<Box ref={containerRef}></Box>
		</Box>
	);
});

export default ProjectList;
