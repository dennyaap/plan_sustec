import { makeAutoObservable } from 'mobx';

export default class ProjectStore {
    constructor() {
        this._projects = [];
        makeAutoObservable(this);
    }

    setProjects(projects) {
		this._projects = projects;
	}

	get projects() {
		return this._projects;
	}
}