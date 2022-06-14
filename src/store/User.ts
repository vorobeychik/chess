import { makeAutoObservable } from "mobx";
import { Socket } from "./Socket";
import { userAuth } from "../services/services";
import { User as UserType } from "../types/types";

export class User {
    userData: UserType | null = null;
    isLoading = false;

    constructor() {
        /*  this.socket.socket.emit('newGame'); */

        makeAutoObservable(this, {

        }, { autoBind: true });
    }


    setUserData(userData: UserType){
        this.userData = userData;
    }

    get isAuth() {
        return !!this.userData;
    }
}
