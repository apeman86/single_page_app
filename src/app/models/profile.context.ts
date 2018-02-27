import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { Subject } from "rxjs/Subject";
import { ProfileContextEvent } from "./profile.context.event";

@Injectable()
export class ProfileContext {
    user: firebase.User;
    displayName: string;
    email: string;
    name: string;
    show: boolean = false;
    constructor() {

    }

    profileContextUpdated: Subject<ProfileContextEvent> = new Subject<ProfileContextEvent>();

    clear(): void {
        this.displayName = undefined;
        this.email = undefined;
        this.name = undefined;
        this.user = undefined;
    }
}