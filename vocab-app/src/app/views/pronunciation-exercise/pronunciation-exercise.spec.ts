import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronunciationExercise } from './pronunciation-exercise';

describe('PronunciationExercise', () => {
  let component: PronunciationExercise;
  let fixture: ComponentFixture<PronunciationExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PronunciationExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PronunciationExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
