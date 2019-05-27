import { MemoryGameLoaded } from './memory-game.actions';
import {
  MemoryGameState,
  Entity,
  initialState,
  memoryGameReducer
} from './memory-game.reducer';

describe('MemoryGame Reducer', () => {
  const getMemoryGameId = it => it['id'];
  let createMemoryGame;

  beforeEach(() => {
    createMemoryGame = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid MemoryGame actions ', () => {
    it('should return set the list of known MemoryGame', () => {
      const memoryGames = [
        createMemoryGame('PRODUCT-AAA'),
        createMemoryGame('PRODUCT-zzz')
      ];
      const action = new MemoryGameLoaded(memoryGames);
      const result: MemoryGameState = memoryGameReducer(initialState, action);
      const selId: string = getMemoryGameId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = memoryGameReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
