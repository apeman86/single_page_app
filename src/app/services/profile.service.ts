import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ProfileContext } from "../models/profile.context";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class ProfileService {
    currentProfileContextInitialized: Observable<void>;

    constructor(
        public route: ActivatedRoute,
        public router: Router,
        public profileContext: ProfileContext){
        
    }

    resolve(): Observable<void> {
        return this.currentProfileContextInitialized;
    }

    getCurrentUser(): Observable<void> {
        return Observable.of(this.profileContext.profileContextUpdated.next());
    }
}