import { $authHost, $host } from "./index";

export const createProject = async ( project ) => {
	const { data } = await $authHost.post('api/project', project);
	return data;
}
export const fetchProjects = async (userId, limit, page, statusId, searchValue = '') => {
	const { data } = await $authHost.post('api/project/userProjects', {userId, limit, page, statusId, searchValue});
	return data;
}
export const fetchStatuses = async () => {
	const { data } = await $host.get('api/projectStatus');
	return data;
}
export const changeStatus = async ({ projectId, statusId }) => {
	const { data } = await $authHost.post('api/projectStatus/change', { projectId, statusId });
	return data;
}
export const destroyProject = async (projectId) => {
	const { data } = await $authHost.post('api/project/destroy', { projectId });
	return data;
} 
export const fetchRoles = async () => {
	const { data } = await $host.get('api/projectRole');
	return data;
}
export const updateProject = async (project) => {
	const { data } = await $authHost.post('api/project/update', project);
	return data;
}