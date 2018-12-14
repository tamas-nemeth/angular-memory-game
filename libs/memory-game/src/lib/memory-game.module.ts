import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatSnackBarModule,
    MatBadgeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: GameComponent }
    ])
  ],
  declarations: [GameComponent, CardComponent]
})
export class MemoryGameModule {}
