import { Component, OnInit, Input } from '@angular/core';
import { GameContext } from '../models/game.context';
import { ProfileContext } from '../models/profile.context';
import { ProfileService } from '../services/profile.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Array<GameContext>;

  constructor(
    private profileContext: ProfileContext,
    private profileService: ProfileService,
    public afdb: AngularFireDatabase) { 
      
    }

  ngOnInit() {
    this.afdb.list('/games').query.on('value', (data) => {
      this.games = Object.values(data.val());
      console.log('Games: ', this.games);
    });
  }

}
