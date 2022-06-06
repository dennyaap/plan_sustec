import { useContext, useEffect } from 'react';
import ProjectList from "../../components/projectlist/ProjectList";
import { fetchProjects } from '../../http/projectAPI';
import Context from '../../index';

const Projects = () => {
	// const projects = [
	// 	{
	// 		name: 'Проект 1',
	// 		createdAt: '6.06.22',
	// 		status: 'Активен'
	// 	}
	// ];
	const { project } = useContext(Context);

	useEffect( () => {
		fetchProjects().then( data => project.setProjects(data));
	}, []);

  	return (
    	<ProjectList />
  	);
}

export default Projects;