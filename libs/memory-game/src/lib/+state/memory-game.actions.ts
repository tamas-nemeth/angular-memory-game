import { Action } from '@ngrx/store';
import { Entity } from './memory-game.reducer';

export enum MemoryGameActionTypes {
  LoadMemoryGame = '[MemoryGame] Load MemoryGame',
  MemoryGameLoaded = '[MemoryGame] MemoryGame Loaded',
  MemoryGameLoadError = '[MemoryGame] MemoryGame Load Error'
}

export class LoadMemoryGame implements Action {
  readonly type = MemoryGameActionTypes.LoadMemoryGame;
}

export class MemoryGameLoadError implements Action {
  readonly type = MemoryGameActionTypes.MemoryGameLoadError;
  constructor(public payload: any) {}
}

export class MemoryGameLoaded implements Action {
  readonly type = MemoryGameActionTypes.MemoryGameLoaded;
  constructor(public payload: Entity[]) {}
}

export type MemoryGameAction =
  | LoadMemoryGame
  | MemoryGameLoaded
  | MemoryGameLoadError;

export const fromMemoryGameActions = {
  LoadMemoryGame,
  MemoryGameLoaded,
  MemoryGameLoadError
};
