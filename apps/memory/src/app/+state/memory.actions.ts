import { Action } from '@ngrx/store';
import { Entity } from './memory.reducer';

export enum MemoryActionTypes {
  LoadMemory = '[Memory] Load Memory',
  MemoryLoaded = '[Memory] Memory Loaded',
  MemoryLoadError = '[Memory] Memory Load Error'
}

export class LoadMemory implements Action {
  readonly type = MemoryActionTypes.LoadMemory;
}

export class MemoryLoadError implements Action {
  readonly type = MemoryActionTypes.MemoryLoadError;
  constructor(public payload: any) {}
}

export class MemoryLoaded implements Action {
  readonly type = MemoryActionTypes.MemoryLoaded;
  constructor(public payload: Entity[]) {}
}

export type MemoryAction = LoadMemory | MemoryLoaded | MemoryLoadError;

export const fromMemoryActions = {
  LoadMemory,
  MemoryLoaded,
  MemoryLoadError
};
