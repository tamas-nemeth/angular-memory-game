import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { MemoryEffects } from './memory.effects';
import { LoadMemory, MemoryLoaded } from './memory.actions';

describe('MemoryEffects', () => {
  let actions: Observable<any>;
  let effects: MemoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        MemoryEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(MemoryEffects);
  });

  describe('loadMemory$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadMemory() });
      expect(effects.loadMemory$).toBeObservable(
        hot('-a-|', { a: new MemoryLoaded([]) })
      );
    });
  });
});
