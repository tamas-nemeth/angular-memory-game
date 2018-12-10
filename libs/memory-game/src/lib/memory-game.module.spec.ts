import { async, TestBed } from '@angular/core/testing';
import { MemoryGameModule } from './memory-game.module';

describe('MemoryGameModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MemoryGameModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MemoryGameModule).toBeDefined();
  });
});
