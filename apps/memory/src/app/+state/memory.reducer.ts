import { MemoryAction, MemoryActionTypes } from './memory.actions';

export const MEMORY_FEATURE_KEY = 'memory';

/**
 * Interface for the 'Memory' data used in
 *  - MemoryState, and
 *  - memoryReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface MemoryState {
  list: Entity[]; // list of Memory; analogous to a sql normalized table
  selectedId?: string | number; // which Memory record has been selected
  loaded: boolean; // has the Memory list been loaded
  error?: any; // last none error (if any)
}

export interface MemoryPartialState {
  readonly [MEMORY_FEATURE_KEY]: MemoryState;
}

export const initialState: MemoryState = {
  list: [],
  loaded: false
};

export function memoryReducer(
  state: MemoryState = initialState,
  action: MemoryAction
): MemoryState {
  switch (action.type) {
    case MemoryActionTypes.MemoryLoaded: {
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
