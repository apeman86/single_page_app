import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile.component';
import { ProfileContext } from './models/profile.context'
import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Password
  ],
  method: AuthMethods.Popup,
  tos: '',
  credentialHelper: CredentialHelper.AccountChooser
};

@NgModule({
  declarations: [
    AppComponent, ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    
  ],
  providers: [AngularFireDatabase, ProfileContext],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

