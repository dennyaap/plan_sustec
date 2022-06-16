import { useContext, useEffect, useState } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { createProject, fetchProjects, fetchRoles, fetchStatuses } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import ModalDelete from '../../components/modaldelete/ModalDelete';
import { destroyProject } from '../../http/projectAPI';
import ListHeader from '../../components/listheader/ListHeader';

const Projects = observer (() => {
	const { project, user } = useContext( Context );
	const [ isLoading, setIsLoading ] = useState( true );

	const [ selectedProject, setSelectedProject ] = useState({});
	const [ isOpen, setIsOpen ] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	  };
	
	const closeModal = () => {
		setIsOpen(false);
	};

	const deleteProject = (currentProject) => {
		setSelectedProject( currentProject );
		closeModal();

		setIsLoading(true);
		destroyProject( selectedProject.id )
			.then( () => fetchProjects( user.currentUser.id ).then( data => {
				project.setProjects( data.rows )
			})
		).finally( () => setIsLoading(false));
	}
	const addProject = ({name, executors}) => {
		setIsLoading(true);
		console.log(name);
		console.log(executors)
		createProject({ name, userId: user.currentUser.id, statusId: 1, projectExecutors: JSON.stringify(executors) })
			.then( () => fetchProjects( user.currentUser.id ).then( data => {
				project.setProjects( data.rows )
			})
		).finally( () => setIsLoading(false))
	}

	useEffect( () => {
		fetchProjects( user.currentUser.id )
			.then( data =>  {
				project.setProjects( data.rows );
			})
			.then( () => fetchStatuses().then( data => {
				project.setStatuses( data );
			}))
			.then( () => fetchRoles().then( data => {
				project.setRoles( data );
				console.log(data)
			}))
			.finally( () => setIsLoading( false ) );
	}, [] );

  	return (
		<div>
			<ListHeader addProject={ addProject }/>
			<ModalDelete isOpen={ isOpen } closeModal={ closeModal } deleteProject={ deleteProject } selectedProject={ selectedProject } />
			<ProjectList isLoading={ isLoading } deleteProject={ deleteProject } setSelectedProject={ setSelectedProject } openModal={ openModal } closeModal={ closeModal } isOpen={ isOpen } />
		</div>
  	);
});

export default Projects;