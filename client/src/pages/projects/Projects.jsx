import { useContext, useEffect, useState } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { fetchProjects, fetchStatuses } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';
import ModalDelete from '../../components/modaldelete/ModalDelete';
import { destroyProject } from '../../http/projectAPI';
import ListHeader from '../../components/listheader/ListHeader';

const Projects = observer (() => {
	const { project, user } = useContext( Context );
	const [ loading, setLoading ] = useState( true );

	const [ selectedProject, setSelectedProject ] = useState({});
	const [ isOpen, setIsOpen ] = useState(false);

	const deleteProject = (currentProject) => {
		setSelectedProject( currentProject );
		closeModal();

		setLoading(true);
		destroyProject( selectedProject.id )
			.then( () => fetchProjects( user.currentUser.id ).then( data => {
				project.setProjects( data.rows )
			}).finally( () => setLoading(false))
		);
	}
	const openModal = () => {
		setIsOpen(true);
	  };
	
	const closeModal = () => {
		setIsOpen(false);
	};


	useEffect( () => {
		fetchProjects( user.currentUser.id )
			.then( data =>  {
				project.setProjects( data.rows );
			})
			.then( () => fetchStatuses().then( data => {
				project.setStatuses( data );
			})).finally( () => setLoading( false ) );
	}, [] );
	
	if( loading ) {
		return <SpinnerLoader />
	}

  	return (
		<div>
			<ListHeader />
			<ModalDelete isOpen={ isOpen } closeModal={ closeModal } deleteProject={ deleteProject } selectedProject={ selectedProject } />
			<ProjectList deleteProject={ deleteProject } setSelectedProject={ setSelectedProject } openModal={ openModal } closeModal={ closeModal } isOpen={ isOpen } />
		</div>
  	);
});

export default Projects;