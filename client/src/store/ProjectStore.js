import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
    constructor() {
        this._projects = [];
		this._statuses = [];
        makeAutoObservable(this);
    }

    setProjects(projects) {
		this._projects = projects;
	}
	setStatuses(statuses) {
		this._statuses = statuses;
	}

	get projects() {
		return this._projects;
	}
	get statuses() {
		return this._statuses;
	}
}