import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { MemoryGamePartialState } from './memory-game.reducer';
import {
  LoadMemoryGame,
  MemoryGameLoaded,
  MemoryGameLoadError,
  MemoryGameActionTypes
} from './memory-game.actions';

@Injectable()
export class MemoryGameEffects {
  @Effect() loadMemoryGame$ = this.dataPersistence.fetch(
    MemoryGameActionTypes.LoadMemoryGame,
    {
      run: (action: LoadMemoryGame, state: MemoryGamePartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new MemoryGameLoaded([]);
      },

      onError: (action: LoadMemoryGame, error) => {
        console.error('Error', error);
        return new MemoryGameLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<MemoryGamePartialState>
  ) {}
}
