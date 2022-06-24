import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { createProject, fetchProjects, fetchRoles, fetchStatuses, destroyProject, updateProject } from '../../http/projectAPI';
import Context from '../../index';
import ModalDelete from '../../components/modaldelete/ModalDelete';
import ModalEdit from '../../components/modaledit/ModalEdit';
import ProjectList from "../../components/projectlist/ProjectList";
import { getCountPages, getOffsetElements } from '../../utils/utils';

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

	const changeSortStatus = (status) => {
		project.setProjects([]);
		setOffsetProjects(getOffsetElements(1, limitProjects));
		changePage({}, 1);
		setCurrentSortStatus(status);
	}


	const changePage = (event, value) => {
		let numberPage = value;
		
		if (numberPage !== currentPage) {
			project.setProjects([])
			window.scrollTo(0, 0);
			setCurrentPage(value);
			setOffsetProjects(getOffsetElements(value, limitProjects));
		}
	}

	const changeAlertMessage = (countProjects) => {
		if(!countProjects) {
			if(currentSortStatus == ''){
				setAlertMessage('Создайте ваш первый проект')
			} 
			else if (currentSortStatus === 1) {
				setAlertMessage('Активные проекты отсутствуют')
			}
			else if (currentSortStatus === 2) {
				setAlertMessage('Выполните ваш первый проект')
			}
		} else {
			setAlertMessage('');
		}
	}
	
	const deleteProject = (currentProject) => {
		setSelectedProject( currentProject );
		closeModal();

		setIsLoading(true);
		destroyProject( selectedProject.id )
			.then( () => {
				project.setProjects(project.projects.filter(item => item.id !== selectedProject.id))
				fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
					.then( data =>  {
						project.setProjects([...project.projects, ...data.rows.filter((projectItem) => !project.projects.find(item => item.id === projectItem.id))] );
						setCountPages( getCountPages(data.count) );
						changeAlertMessage(data.count);
					})
			}).finally(() => setIsLoading(true));

	}
	const addProject = ({name, executors}) => {
		createProject({ name, userId: user.currentUser.id, statusId: 1, projectExecutors: JSON.stringify(executors) })
			.then( () => {
				fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
					.then( data =>  {
						project.setProjects(data.rows);		
						changePage({}, 1);
						setCountPages( getCountPages(data.count, limitProjects) );
						changeAlertMessage(project.projects.length);
					})
			})
	}
	const editProject = (currentProject) => {
		updateProject(currentProject)
			.then( () => {
				fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
					.then( data =>  {
						project.setProjects(data.rows);
					})
			}
		).finally( () => setIsLoading( false ) );
	}

	useEffect( () => {
		setIsLoading(true);
		fetchProjects( user.currentUser.id, limitProjects, currentPage, currentSortStatus )
			.then( data =>  {
				project.setProjects([...project.projects, ...data.rows] );
				setCountPages( getCountPages(data.count, limitProjects) );
				changeAlertMessage(data.count)
			})
			.finally(() => {setIsLoading(false)})
	}, [currentPage, currentSortStatus] );

	useEffect( () => {
		fetchStatuses()
			.then( data => project.setStatuses( data ))
			.then( () => fetchRoles().then( data => project.setRoles( data )))
	}, [])

	
  	return (
		<div>
			<ModalDelete isOpen={ isOpen } closeModal={ closeModal } deleteProject={ deleteProject } selectedProject={ selectedProject } />
			<ModalEdit isOpenModalEdit={isOpenModalEdit} closeModalEdit={closeModalEdit} setSelectedProject={ setSelectedProject } selectedProject={selectedProject} editProject={editProject}/>
	
			<ProjectList isLoading={ isLoading } deleteProject={ deleteProject } setSelectedProject={ setSelectedProject } openModal={ openModal } closeModal={ closeModal } isOpen={ isOpen } openModalEdit={openModalEdit} closeModalEdit={closeModalEdit} offsetProjects={offsetProjects} countPages={countPages} currentPage={currentPage} changePage={changePage} alertMessage={alertMessage} addProject={ addProject } currentSortStatus={currentSortStatus} changeSortStatus={changeSortStatus} setCurrentPage={setCurrentPage}/>
		</div>
  	);
});

export default Projects;