import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationExercise } from './translation-exercise';

describe('TranslationExercise', () => {
  let component: TranslationExercise;
  let fixture: ComponentFixture<TranslationExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
