import { useContext, useEffect, useState } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { fetchProjects } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';
import Spinner from 'react-bootstrap/Spinner'


const Projects = observer (() => {
	const { project, user } = useContext(Context);
	const [loading, setLoading ] = useState( true );

	useEffect( () => {
		fetchProjects(user.currentUser.id).then( data => 
			project.setProjects( data.rows )
		).finally( () => setLoading( false ));
	}, [] );
	
	if( loading ) {
		return <Spinner 
			animation={ 'border' } 
			variant={ 'primary' }
			style={ { position: "absolute", top: "50%", left: "50%", width: 120, height: 120 } }
		/>
	}

  	return (
    	<ProjectList />
  	);
});

export default Projects;