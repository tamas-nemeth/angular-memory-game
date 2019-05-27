import { MemoryGameAction, MemoryGameActionTypes } from './memory-game.actions';

export const MEMORYGAME_FEATURE_KEY = 'memoryGame';

/**
 * Interface for the 'MemoryGame' data used in
 *  - MemoryGameState, and
 *  - memoryGameReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface MemoryGameState {
  list: Entity[]; // list of MemoryGame; analogous to a sql normalized table
  selectedId?: string | number; // which MemoryGame record has been selected
  loaded: boolean; // has the MemoryGame list been loaded
  error?: any; // last none error (if any)
}

export interface MemoryGamePartialState {
  readonly [MEMORYGAME_FEATURE_KEY]: MemoryGameState;
}

export const initialState: MemoryGameState = {
  list: [],
  loaded: false
};

export function memoryGameReducer(
  state: MemoryGameState = initialState,
  action: MemoryGameAction
): MemoryGameState {
  switch (action.type) {
    case MemoryGameActionTypes.MemoryGameLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
