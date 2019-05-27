import { MemoryLoaded } from './memory.actions';
import {
  MemoryState,
  Entity,
  initialState,
  memoryReducer
} from './memory.reducer';

describe('Memory Reducer', () => {
  const getMemoryId = it => it['id'];
  let createMemory;

  beforeEach(() => {
    createMemory = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Memory actions ', () => {
    it('should return set the list of known Memory', () => {
      const memorys = [
        createMemory('PRODUCT-AAA'),
        createMemory('PRODUCT-zzz')
      ];
      const action = new MemoryLoaded(memorys);
      const result: MemoryState = memoryReducer(initialState, action);
      const selId: string = getMemoryId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = memoryReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
