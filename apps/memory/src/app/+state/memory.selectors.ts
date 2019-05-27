import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MEMORY_FEATURE_KEY, MemoryState } from './memory.reducer';

// Lookup the 'Memory' feature state managed by NgRx
const getMemoryState = createFeatureSelector<MemoryState>(MEMORY_FEATURE_KEY);

const getLoaded = createSelector(
  getMemoryState,
  (state: MemoryState) => state.loaded
);
const getError = createSelector(
  getMemoryState,
  (state: MemoryState) => state.error
);

const getAllMemory = createSelector(
  getMemoryState,
  getLoaded,
  (state: MemoryState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getMemoryState,
  (state: MemoryState) => state.selectedId
);
const getSelectedMemory = createSelector(
  getAllMemory,
  getSelectedId,
  (memory, id) => {
    const result = memory.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const memoryQuery = {
  getLoaded,
  getError,
  getAllMemory,
  getSelectedMemory
};
