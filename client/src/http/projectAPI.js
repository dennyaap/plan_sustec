import { $authHost, $host } from "./index";

export const createProject = async ( project ) => {
	const { data } = await $authHost.post('api/project', project);
	return data;
}
export const fetchProjects = async (userId) => {
	const { data } = await $authHost.post('api/project/userProjects', {userId});
	return data;
}