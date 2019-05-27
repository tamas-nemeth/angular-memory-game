import { Entity, MemoryGameState } from './memory-game.reducer';
import { memoryGameQuery } from './memory-game.selectors';

describe('MemoryGame Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMemoryGameId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createMemoryGame = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      memoryGame: {
        list: [
          createMemoryGame('PRODUCT-AAA'),
          createMemoryGame('PRODUCT-BBB'),
          createMemoryGame('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('MemoryGame Selectors', () => {
    it('getAllMemoryGame() should return the list of MemoryGame', () => {
      const results = memoryGameQuery.getAllMemoryGame(storeState);
      const selId = getMemoryGameId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedMemoryGame() should return the selected Entity', () => {
      const result = memoryGameQuery.getSelectedMemoryGame(storeState);
      const selId = getMemoryGameId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = memoryGameQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = memoryGameQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
