import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from '../app.component';
import { ProfileComponent } from '../profile.component';
import { ProfileContext } from '../models/profile.context'
import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { GamesComponent } from './games.component';
import { GameContext } from '../models/game.context';
import { FriendsComponent } from '../friends/friends.component';
import { ProfileService } from '../services/profile.service';
import { routing } from './games.routes';
import { PigPenComponent } from './pig-pen/pig-pen.component';
import { Post } from './pig-pen/models/post';

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
    GamesComponent, PigPenComponent
  ],
  imports: [
    routing,
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    HttpModule,
    MatIconModule
  ],
  providers: [AngularFireDatabase, ProfileContext, GameContext, ProfileService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GamesModule {}