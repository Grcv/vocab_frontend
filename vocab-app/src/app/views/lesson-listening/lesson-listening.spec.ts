import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListening } from './lesson-listening';

describe('LessonListening', () => {
  let component: LessonListening;
  let fixture: ComponentFixture<LessonListening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonListening]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonListening);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
