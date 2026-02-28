import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationPhonemeExercise } from './translation-phoneme-exercise';

describe('TranslationPhonemeExercise', () => {
  let component: TranslationPhonemeExercise;
  let fixture: ComponentFixture<TranslationPhonemeExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationPhonemeExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationPhonemeExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
