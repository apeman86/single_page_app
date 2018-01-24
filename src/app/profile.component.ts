import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileContext } from './models/profile.context';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string;
  name: string;
  displayName: string;

  @Input('profileContext')
  profileContext: ProfileContext

  constructor(public angularFirebaseAuth: AngularFireAuth, public afdb: AngularFireDatabase) { }

  ngOnInit() {
    
  }

}
