import { Routes, RouterModule } from "@angular/router";
import { GamesComponent } from "./games.component";
import { ModuleWithProviders } from "@angular/core";
import { ProfileService } from "../services/profile.service";
import { PigPenComponent } from "./pig-pen/pig-pen.component";

const routes: Routes = [
    {
      path: 'games',
      component: GamesComponent,
      resolve: {
        profileContext: ProfileService
      }
    },
    {
      path: 'pigpens',
      component: PigPenComponent
    }
  ];
  
  export const routing: ModuleWithProviders = RouterModule.forChild(routes);