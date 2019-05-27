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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MEMORYGAME_FEATURE_KEY, initialState as memoryGameInitialState, memoryGameReducer } from './+state/memory-game.reducer';
import { MemoryGameEffects } from './+state/memory-game.effects';

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
    ]),
    StoreModule.forFeature(MEMORYGAME_FEATURE_KEY, memoryGameReducer, { initialState: memoryGameInitialState }),
    EffectsModule.forFeature([MemoryGameEffects])
  ],
  declarations: [GameComponent, CardComponent]
})
export class MemoryGameModule {}
