export const TASKS_ROUTE = '/tasks';
export const PROJECTS_ROUTE = '/projects';
export const LOGIN_ROUTE = '/login';

export const PROJECT_STATUSES = [
	{
	   id: 1, 
	   name: 'ACTIVE',
	   color: ''
   }, 
   {
	   id: 2, 
	   name: 'DONE',
	   color: 'rgba(196, 196, 196, 0.32)'
   }, 
   {
	   id: 3, 
	   name: 'OVERDUE',
	   color: 'rgba(254, 80, 80, 0.29)'
   } 
];

export const COLORS = {
	WHITE: '#fff',
	LIGHT_GREY: '#C2CFE0',
	BLUE: '#109CF1',
	GREEN: '#32E182',
	RED: '#FE5B5B',
	ORANGE: '#FFBF43',
	LIGHT_BLUE: '#8594A8',
	DARK_BLUE: '#334D6E',
	DARK_GREY: '#707683'
}

export const PROJECT_TITLES = [
	{
		nameCell: '№'
	},
	{
		nameCell: 'Название'
	},
	{
		nameCell: 'Дата создания'
	},
	{
		nameCell: 'Статус'
	},
	{
		nameCell: 'Редактировать'
	},
	{
		nameCell: 'Удалить'
	},
]