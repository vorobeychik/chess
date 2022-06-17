import { makeAutoObservable } from "mobx";
import { User as UserType } from "../types/types";

export class User {
    userData: UserType | null = null;
    isLoading = false;

    constructor() {
        makeAutoObservable(this, {

        }, { autoBind: true });
    }

    setUserData(userData: UserType) {
        this.userData = userData;
    }

    get isAuth() {
        return !!this.userData;
    }
}
