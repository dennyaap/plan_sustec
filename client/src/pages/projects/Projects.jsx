import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createProject, fetchProjects, fetchRoles, fetchStatuses, destroyProject, updateProject } from '../../http/projectAPI';
import Context from '../../index';
import ModalDelete from '../../components/modaldelete/ModalDelete';
import ModalEdit from '../../components/modaledit/ModalEdit';
import ProjectList from "../../components/projectlist/ProjectList";
import { getCountPages, getOffsetElements } from '../../utils/utils';
import { Box } from '@mui/material';

import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import useElementOnScreen from '../../hooks/useElementOnScreen';
import ListHeader from '../../components/listheader/ListHeader';


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

	const [ alertMessage, setAlertMessage ] = useState('');

	const [ currentSortStatus, setCurrentSortStatus ] = useState(1);

	const options = {
		rootMargin: '0px',
		threshold: 0.1
	}
	const [ containerRef, isVisible ] = useElementOnScreen(currentPage, countPages, setCurrentPage, isLoading, options);

	const [ projects, setCurrentProjects ] = useState([]);


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

	const changeSortStatus = (sortStatus) => {
		if(currentPage > 1){
			setCurrentProjects([]);
			setCurrentPage(1);
			setCurrentSortStatus(sortStatus);
		} else {
			fetchProjects(user.currentUser.id, limitProjects, 1, sortStatus, project.searchValue ? project.searchValue : '')
			.then((data) => {
				setCurrentProjects(data.rows);
				setOffsetProjects(getOffsetElements(1, limitProjects));
				setCurrentSortStatus(sortStatus);
				setCountPages( getCountPages(data.count, limitProjects) );
				changeAlertMessage(data.count, sortStatus);
			});
		}
	}


	const changePage = (event, value) => {
		let numberPage = value;
		setCurrentProjects([]);
		window.scrollTo(0, 0);
		setCurrentPage(numberPage);
		setOffsetProjects(getOffsetElements(value, limitProjects));
	}

	const changeAlertMessage = (countProjects, sortStatus) => {
		if(!countProjects) {
			if(sortStatus == ''){
				setAlertMessage('Создайте ваш первый проект')
			} 
			else if (sortStatus === 1) {
				setAlertMessage('Активные проекты отсутствуют')
			}
			else if (sortStatus === 2) {
				setAlertMessage('Выполните ваш первый проект')
			}
		} else {
			setAlertMessage('');
		}
	}
	
	const deleteProject = (currentProject) => {
		setSelectedProject( currentProject );
		closeModal();
		destroyProject( selectedProject.id )
			.then( () => {
				setIsLoading(true);
				fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
					.then( data =>  {
						setCurrentProjects([...projects.filter(item => item.id !== selectedProject.id), ...data.rows.filter((projectItem) => !projects.find(item => item.id === projectItem.id))] );
						setCountPages( getCountPages(data.count, limitProjects) );
						changeAlertMessage(data.count);
					}).finally(() => setIsLoading(false))
			});

	}
	const addProject = ({name, executors}) => {
		setIsLoading(true);
		createProject({ name, userId: user.currentUser.id, statusId: 1, projectExecutors: JSON.stringify(executors) })
			.then( () => {
				if(currentPage !== 1){
					setCurrentProjects([]);
					setCurrentPage(1);
				} else {
					let page = 1;
					fetchProjects(user.currentUser.id, limitProjects, page, currentSortStatus, project.searchValue ? project.searchValue : '')
						.then( (data) => {
							setCurrentProjects(data.rows);
							setCountPages( getCountPages(data.count, limitProjects) );
							setOffsetProjects(getOffsetElements(page, limitProjects));
						})
				}
			})
	}
	const editProject = (currentProject) => {
		updateProject(currentProject)
			.then( () => {
				fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
					.then( data =>  {
						setCurrentProjects(data.rows);
					})
			}
		).finally( () => setIsLoading( false ) );
	}

	useEffect( () => {
		setIsLoading(true);
		fetchProjects(user.currentUser.id, limitProjects, currentPage, currentSortStatus, project.searchValue ? project.searchValue : '')
			.then( (data) => {
				setCurrentProjects([...projects, ...data.rows]);
				setCountPages( getCountPages(data.count, limitProjects) );
				changeAlertMessage(data.count, currentSortStatus);
			})
			.finally(() => setIsLoading(false));
		
	}, [currentPage] );

	useEffect( () => {
		if(project.searchValue){
			setIsLoading(true);
			fetchProjects(user.currentUser.id, limitProjects, 1, currentSortStatus, project.searchValue ? project.searchValue : '')
			.then( (data) => {
				setCurrentProjects(data.rows);
				setCountPages( getCountPages(data.count, limitProjects) );
				changeAlertMessage(data.count, currentSortStatus);
			})
			.finally(() => setIsLoading(false));
		}
	}, [project.searchValue])

	useEffect( () => {
		fetchStatuses()
			.then( data => project.setStatuses( data ))
			.then( () => fetchRoles().then( data => project.setRoles( data )))
	}, [])
	
  	return (
		<div>
			<ModalDelete isOpen={ isOpen } closeModal={ closeModal } deleteProject={ deleteProject } selectedProject={ selectedProject } />
			<ModalEdit isOpenModalEdit={isOpenModalEdit} closeModalEdit={closeModalEdit} setSelectedProject={ setSelectedProject } selectedProject={selectedProject} editProject={editProject}/>

			<ListHeader addProject={ addProject } currentSortStatus={currentSortStatus} changeSortStatus={changeSortStatus}/>
			<ProjectList projects={projects} isLoading={ isLoading } setSelectedProject={ setSelectedProject } openModal={ openModal } closeModal={ closeModal } openModalEdit={openModalEdit} offsetProjects={offsetProjects} alertMessage={alertMessage} />
			
			<Stack sx={{marginTop: 6}}>
				<Pagination count={countPages} page={currentPage} onChange={changePage}/>
			</Stack>
			<Box ref={containerRef}></Box>
		</div>
  	);
});

export default Projects;