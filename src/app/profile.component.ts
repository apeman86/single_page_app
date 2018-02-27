import { Component, OnInit, Input, HostListener } from '@angular/core';
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
  show: boolean = false;
  @Input('profileContext')
  profileContext: ProfileContext

  constructor(public angularFirebaseAuth: AngularFireAuth, public afdb: AngularFireDatabase) { }

  ngOnInit() {
    
  }

  @HostListener('document:click', ['$event'])
  onKeyUp(ev:MouseEvent) {
    if ( !this.getClosest(event.target, '.profile-container') && this.profileContext.show ) {
      this.profileContext.show = false;
    }
  }

  getClosest( elem, selector ): boolean {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector;
      }
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;

  };
}
