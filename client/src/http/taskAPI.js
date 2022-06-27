import { $authHost, $host } from "./index";

export const createTask = async ( project ) => {
	const { data } = await $authHost.post('api/project', project);
	return data;
}
export const fetchTasks = async (projectId, statusId, limit, page, searchValue = '') => {
	const { data } = await $authHost.post('api/task/projectTasks', {projectId, statusId, limit, page, searchValue});
	return data;
}
export const fetchStatuses = async () => {
	const { data } = await $host.get('api/taskStatus');
	return data;
}
export const changeStatus = async ({ projectId, statusId }) => {
	const { data } = await $authHost.post('api/projectStatus/change', { projectId, statusId });
	return data;
}
export const destroyTask = async (projectId) => {
	const { data } = await $authHost.post('api/project/destroy', { projectId });
	return data;
} 
export const fetchRoles = async () => {
	const { data } = await $host.get('api/projectRole');
	return data;
}
export const updateTask = async (project) => {
	const { data } = await $authHost.post('api/project/update', project);
	return data;
}