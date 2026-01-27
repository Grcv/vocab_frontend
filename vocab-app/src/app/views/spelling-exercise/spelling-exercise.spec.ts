import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellingExercise } from './spelling-exercise';

describe('SpellingExercise', () => {
  let component: SpellingExercise;
  let fixture: ComponentFixture<SpellingExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellingExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellingExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
