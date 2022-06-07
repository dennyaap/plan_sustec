import { useContext, useEffect } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { fetchProjects } from '../../http/projectAPI';
import { observer } from 'mobx-react-lite';
import Context from '../../index';

const Projects = observer (() => {
	const { project, user } = useContext(Context);

	useEffect( () => {
		fetchProjects(user.currentUser.id).then( data => project.setProjects( data.rows ));
	});

  	return (
    	<ProjectList />
  	);
});

export default Projects;