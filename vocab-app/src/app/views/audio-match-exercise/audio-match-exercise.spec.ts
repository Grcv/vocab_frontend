import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioMatchExercise } from './audio-match-exercise';

describe('AudioMatchExercise', () => {
  let component: AudioMatchExercise;
  let fixture: ComponentFixture<AudioMatchExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioMatchExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioMatchExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
