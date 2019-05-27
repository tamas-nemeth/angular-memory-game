import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MEMORYGAME_FEATURE_KEY, MemoryGameState } from './memory-game.reducer';

// Lookup the 'MemoryGame' feature state managed by NgRx
const getMemoryGameState = createFeatureSelector<MemoryGameState>(
  MEMORYGAME_FEATURE_KEY
);

const getLoaded = createSelector(
  getMemoryGameState,
  (state: MemoryGameState) => state.loaded
);
const getError = createSelector(
  getMemoryGameState,
  (state: MemoryGameState) => state.error
);

const getAllMemoryGame = createSelector(
  getMemoryGameState,
  getLoaded,
  (state: MemoryGameState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getMemoryGameState,
  (state: MemoryGameState) => state.selectedId
);
const getSelectedMemoryGame = createSelector(
  getAllMemoryGame,
  getSelectedId,
  (memoryGame, id) => {
    const result = memoryGame.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const memoryGameQuery = {
  getLoaded,
  getError,
  getAllMemoryGame,
  getSelectedMemoryGame
};
