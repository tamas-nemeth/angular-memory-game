import { async, TestBed } from '@angular/core/testing';
import { MemoryHomeModule } from './memory-home.module';

describe('MemoryHomeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MemoryHomeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MemoryHomeModule).toBeDefined();
  });
});
