import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseSettings } from './exercise-settings';

describe('ExerciseSettings', () => {
  let component: ExerciseSettings;
  let fixture: ComponentFixture<ExerciseSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
