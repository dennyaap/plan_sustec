import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._currentUser = {};
        makeAutoObservable(this);
    }

    //Actions - изменяют состояния
    setIsAuth(bool){
        this._isAuth = bool;
    }
    setUser(currentUser){
        this._currentUser = currentUser;
    }

    //Computed functions - вызываются в том случае, если переменная внутри компонента была изменена
    get isAuth() {
        return this._isAuth;
    }
    get currentUser() {
        return this._currentUser;
    }
}