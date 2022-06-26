import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
    constructor() {
        this._projects = [];
		this._statuses = [];
		this._searchValue = '';
		this._roles = [];
        makeAutoObservable(this);
    }

    setProjects(projects) {
		this._projects = projects;
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

	get projects() {
		return this._projects;
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