import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioMatchPhonemeExercise } from './audio-match-phoneme-exercise';

describe('AudioMatchPhonemeExercise', () => {
  let component: AudioMatchPhonemeExercise;
  let fixture: ComponentFixture<AudioMatchPhonemeExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioMatchPhonemeExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioMatchPhonemeExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
