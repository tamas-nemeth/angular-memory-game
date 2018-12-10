import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material';

import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameComponent }
    ])
  ],
  declarations: [GameComponent]
})
export class MemoryGameModule {}
