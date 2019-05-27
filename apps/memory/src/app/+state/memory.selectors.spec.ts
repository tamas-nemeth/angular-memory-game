import { Entity, MemoryState } from './memory.reducer';
import { memoryQuery } from './memory.selectors';

describe('Memory Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMemoryId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createMemory = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      memory: {
        list: [
          createMemory('PRODUCT-AAA'),
          createMemory('PRODUCT-BBB'),
          createMemory('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Memory Selectors', () => {
    it('getAllMemory() should return the list of Memory', () => {
      const results = memoryQuery.getAllMemory(storeState);
      const selId = getMemoryId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedMemory() should return the selected Entity', () => {
      const result = memoryQuery.getSelectedMemory(storeState);
      const selId = getMemoryId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = memoryQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = memoryQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
