import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { MemoryGameEffects } from './memory-game.effects';
import { LoadMemoryGame, MemoryGameLoaded } from './memory-game.actions';

describe('MemoryGameEffects', () => {
  let actions: Observable<any>;
  let effects: MemoryGameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        MemoryGameEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(MemoryGameEffects);
  });

  describe('loadMemoryGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadMemoryGame() });
      expect(effects.loadMemoryGame$).toBeObservable(
        hot('-a-|', { a: new MemoryGameLoaded([]) })
      );
    });
  });
});
