import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMatchExercise } from './image-match-exercise';

describe('ImageMatchExercise', () => {
  let component: ImageMatchExercise;
  let fixture: ComponentFixture<ImageMatchExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageMatchExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageMatchExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
