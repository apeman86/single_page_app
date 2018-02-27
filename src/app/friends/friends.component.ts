import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileContext } from '../models/profile.context';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  @Input('profileContext')
  profileContext: ProfileContext

  constructor(public angularFirebaseAuth: AngularFireAuth, public afdb: AngularFireDatabase) { }

  ngOnInit() {
    this.afdb.object('/users/' + this.profileContext.user.uid + '/friends').query.on('value', (data) => {
      if (data) {
        console.log('Friends', data);
      }
    });
  }

}
