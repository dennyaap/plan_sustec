import { $authHost, $host } from "./index";

export const createProject = async ( project ) => {
	const { data } = await $authHost.post('api/project', project);
	return data;
}
export const fetchProjects = async () => {
	const { data } = await $host.get('api/project');
	return data;
}