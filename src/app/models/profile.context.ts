import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class ProfileContext {
    user: firebase.User;
    displayName: string;
    email: string;
    name: string;
    constructor() {

    }

    clear(): void {
        this.displayName = undefined;
        this.email = undefined;
        this.name = undefined;
        this.user = undefined;
    }
}