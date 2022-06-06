import ProjectList from "../../components/projectlist/ProjectList";

const Projects = () => {
	const projects = [
		{
			name: 'Проект 1',
			createdAt: '6.06.22',
			status: 'Активен'
		}
	];

  	return (
    	<ProjectList projects={ projects }/>
  	);
}

export default Projects;