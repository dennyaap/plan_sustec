import { makeAutoObservable } from 'mobx';

export default class TaskStore {
    constructor() {
        this._tasks = [];
		this._statuses = [];
		this._searchValue = '';
		this._roles = [];
        makeAutoObservable(this);
    }

    setTasks(tasks) {
		this._tasks = tasks;
	}
	setStatuses(statuses) {
		this._statuses = statuses;
	}
	setRoles(roles) {
		this._roles = roles;
	}
	setSearchValue(searchValue) {
		this._searchValue = searchValue;
	}

	get tasks() {
		return this._tasks;
	}
	get statuses() {
		return this._statuses;
	}
	get roles() {
		return this._roles;
	}
	get searchValue() {
		return this._searchValue;
	}
}