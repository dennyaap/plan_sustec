import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        this._isAuth = true;
        this._user = {};
        makeAutoObservable(this);
    }

    //Actions - изменяют состояния
    setIsAuth(bool){
        this._isAuth = bool;
    }
    setUser(user){
        this._user = user;
    }

    //Computed functions - вызываются в том случае, если переменная внутри компонента была изменена
    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
}