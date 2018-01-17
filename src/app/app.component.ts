import { Component } from '@angular/core';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My App';
  user: firebase.User;
  displayName: string;

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    this.user = signInSuccessData.currentUser;
    this.displayName = this.user.providerData[0].displayName;
  }

}
