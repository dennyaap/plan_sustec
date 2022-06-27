import { PROJECTS_ROUTE, TASKS_ROUTE, LOGIN_ROUTE } from './consts/consts';
import Projects from './pages/projects/Projects';
import Tasks from './pages/tasks/Tasks';
import Auth from './pages/auth/Auth';


export const authRoutes = [
	{
		path: PROJECTS_ROUTE,
		Component: Projects
	},
    {
        path: TASKS_ROUTE,
        Component: Tasks
    },
	{
		path: PROJECTS_ROUTE + '/:id' + TASKS_ROUTE,
		Component: Tasks
	}
];

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Auth
	}
]