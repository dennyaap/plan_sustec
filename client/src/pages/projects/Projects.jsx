import { useContext, useEffect, useState } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { fetchProjects, fetchStatuses } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import SpinnerLoader from '../../components/UI/spinnerloader/SpinnerLoader';


const Projects = observer (() => {
	const { project, user } = useContext( Context );
	const [ loading, setLoading ] = useState( true );

	useEffect( () => {
		fetchProjects( user.currentUser.id )
			.then( data =>  {
				project.setProjects( data.rows );
			})
			.then( () => fetchStatuses().then( data => {
				project.setStatuses( data );
			})).finally( () => setLoading( false ));
	}, [] );
	
	if( loading ) {
		return <SpinnerLoader />
	}

  	return (
    	<ProjectList />
  	);
});

export default Projects;