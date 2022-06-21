import { useContext, useEffect, useState, useRef } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { createProject, fetchProjects, fetchRoles, fetchStatuses } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import ModalDelete from '../../components/modaldelete/ModalDelete';
import { destroyProject, updateProject } from '../../http/projectAPI';
import ListHeader from '../../components/listheader/ListHeader';
import ModalEdit from '../../components/modaledit/ModalEdit';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';
import { COLORS } from '../../consts/consts';




const Projects = observer (() => {
	const { project, user } = useContext( Context );
	const [ isLoading, setIsLoading ] = useState( true );

	const [ selectedProject, setSelectedProject ] = useState({});
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isOpenModalEdit, setIsOpenModalEdit ] = useState(false);

	const [ countPages, setCountPages ] = useState(0);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ limitProjects, setLimitProjects ] = useState(10);
	const [ offsetProjects, setOffsetProjects ] = useState(0); 

	const lastElement = useRef();
	const observer = useRef();

	const openModal = () => {
		setIsOpen(true);
	  };
	
	const closeModal = () => {
		setIsOpen(false);
	};

	const openModalEdit = () => {
		setIsOpenModalEdit(true);
	}
	const closeModalEdit= () => {
		setIsOpenModalEdit(false);
	}

	const getOffsetProjects = (currentPage, limitProjects) => {
		return currentPage * limitProjects - limitProjects;
	}

	const getCountPages = (currentCountPages) => {
		return Math.ceil(currentCountPages / limitProjects)
	}

	const changePage = (event, value) => {
		let numberPage = value;
		if (numberPage !== currentPage) {
			project.setProjects([]);
			setCurrentPage(value);
			setOffsetProjects(getOffsetProjects(value, limitProjects));
		}
	}
	
	const deleteProject = (currentProject) => {
		setSelectedProject( currentProject );
		closeModal();
	
		destroyProject( selectedProject.id )
			.then( (data) => {
				project.setProjects(project.projects.filter(item => item.id !== selectedProject.id))
				console.log(project.projects);
			})

	}
	const addProject = ({name, executors}) => {
		createProject({ name, userId: user.currentUser.id, statusId: 1, projectExecutors: JSON.stringify(executors) })
			.then( () => {
				fetchProjects( user.currentUser.id, limitProjects, currentPage )
					.then( data =>  {
						project.setProjects(data.rows);		
						setCountPages( getCountPages(data.count) );
					})
			})
	}
	const editProject = (currentProject) => {
		updateProject(currentProject)
			.then( () => {
				fetchProjects( user.currentUser.id, limitProjects, currentPage )
					.then( data =>  {
						project.setProjects(data.rows);		
					})
			}
		).finally( () => setIsLoading( false ) );
	}
	
	useEffect( () => {
		setIsLoading(true);
		fetchProjects( user.currentUser.id, limitProjects, currentPage )
			.then( data =>  {
				project.setProjects([...project.projects, ...data.rows] );
				console.log(project.projects)
				setCountPages( getCountPages(data.count) );
				
			})
			.finally( () => {
				setIsLoading(false);
			} );
	}, [currentPage] );

	useEffect( () => {
		fetchStatuses()
			.then( data => project.setStatuses( data ))
			.then( () => fetchRoles().then( data => project.setRoles( data )))
			.finally( () => setIsLoading( false ) );
	}, [])

	useEffect( () => {
		if(isLoading) return;
		if(observer.current) observer.current.disconnect();
		const callback = (entries) => {
			if(entries[0].isIntersecting && currentPage < countPages){
				console.log(currentPage);
				setCurrentPage(currentPage + 1)
			}
		}
		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElement.current);
	}, [isLoading])


  	return (
		<div>
			<ListHeader addProject={ addProject }/>
			<ModalDelete isOpen={ isOpen } closeModal={ closeModal } deleteProject={ deleteProject } selectedProject={ selectedProject } />
			<ModalEdit isOpenModalEdit={isOpenModalEdit} closeModalEdit={closeModalEdit} setSelectedProject={ setSelectedProject } selectedProject={selectedProject} editProject={editProject}/>
	
			<ProjectList isLoading={ isLoading } deleteProject={ deleteProject } setSelectedProject={ setSelectedProject } openModal={ openModal } closeModal={ closeModal } isOpen={ isOpen } openModalEdit={openModalEdit} closeModalEdit={closeModalEdit} offsetProjects={offsetProjects}/>
			{isLoading && <Box sx={{display: 'flex', justifyContent: 'center'}}><SpinnerLoader animation={ 'border' } style={{ marginTop: 20, width: 75, height: 75, color: COLORS.BLUE }}/></Box>}
			<Stack sx={{marginTop: 4}}>
				<Pagination count={countPages} page={currentPage} onChange={changePage}/>
			</Stack>
		 	<Box ref={lastElement} sx={{marginTop: 10}}></Box>
		</div>
  	);
});

export default Projects;