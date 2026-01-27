import { TestBed } from '@angular/core/testing';

import { ExerciseManager } from './exercise-manager';

describe('ExerciseManager', () => {
  let service: ExerciseManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
