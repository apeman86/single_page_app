import { Component } from '@angular/core';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileContext } from './models/profile.context';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My App';
  isOpen: boolean = false;
  user: firebase.User;
  displayName: string;
  signedIn: boolean = false;
  profileContext: ProfileContext;
  profileObservable: Observable<any>;
  constructor(public angularFirebaseAuth: AngularFireAuth, public afdb: AngularFireDatabase) {
    this.profileContext = new ProfileContext();
  }

  ngOnInit() {
    this.angularFirebaseAuth.authState.subscribe((response) => {
      if (response) {
        if (!this.signedIn) {
          let successData = new FirebaseUISignInSuccess();
          successData.currentUser = response;
          this.successCallback(successData);      
        }
      } else {
        console.log('Logged out :(');
      }
    });
  }

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    this.profileContext.user = signInSuccessData.currentUser;
    console.log(this.profileContext.user);
    this.signedIn = true;
    this.open();
    this.afdb.object('/users/' + this.profileContext.user.uid).query.once('value', (response) => {
      if (this.signedIn) {
        let profile = response.val();
        if (profile) {
          this.profileContext.name = profile.name;
          this.profileContext.email = profile.email;
          this.profileContext.displayName = profile.username;
          this.afdb.object('/users/' + this.profileContext.user.uid).update({lastLogin: new Date()});
        } else {
          let displayName: string 
          while (!displayName) {
            displayName = prompt('Please enter a Username:');
            let data = {};
            if(displayName != null) {
              data[displayName] = this.profileContext.user.uid;
              console.log(displayName);
              this.afdb.object('/usernames/').update(data).then((success) =>{
                let data = {};
                data[this.profileContext.user.uid] = {username: displayName, email: this.profileContext.user.email, name: this.profileContext.user.displayName, lastLogin: new Date()};
                this.afdb.object('/users/').update(data);
              });
            }
          }
        }
      }
    });
  }

  signOut() {
    this.angularFirebaseAuth.auth.signOut().then(() => {
      this.signedIn = false;
      this.profileContext.clear();
      this.open();
    });
  }

  open() {
    this.isOpen = !this.isOpen;
  }
}
