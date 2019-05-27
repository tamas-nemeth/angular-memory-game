import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { MemoryPartialState } from './memory.reducer';
import {
  LoadMemory,
  MemoryLoaded,
  MemoryLoadError,
  MemoryActionTypes
} from './memory.actions';

@Injectable()
export class MemoryEffects {
  @Effect() loadMemory$ = this.dataPersistence.fetch(
    MemoryActionTypes.LoadMemory,
    {
      run: (action: LoadMemory, state: MemoryPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new MemoryLoaded([]);
      },

      onError: (action: LoadMemory, error) => {
        console.error('Error', error);
        return new MemoryLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<MemoryPartialState>
  ) {}
}
