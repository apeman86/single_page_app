import { Component } from '@angular/core';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My App';
  user: firebase.User;
  displayName: string;
  signedIn: boolean = false;

  constructor(public angularFirebaseAuth: AngularFireAuth) {
    
  }

  ngOnInit() {
    this.angularFirebaseAuth.authState.subscribe((response) => {
      if (response) {
        if (!this.signedIn) {
          let successData = new FirebaseUISignInSuccess();
          successData.currentUser = response;
          this.successCallback(successData);      
        }
        console.log('Logged in :)');
      } else {
        console.log('Logged out :(');
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    this.user = signInSuccessData.currentUser;    
    this.displayName = this.user.displayName;
    this.signedIn = true;
  }

  signOut() {
    this.angularFirebaseAuth.auth.signOut().then(() => {
      this.signedIn = false;
      delete this.user;
      delete this.displayName;
    });
  }
}
