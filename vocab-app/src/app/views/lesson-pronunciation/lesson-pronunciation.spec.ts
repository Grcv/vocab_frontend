import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPronunciation } from './lesson-pronunciation';

describe('LessonPronunciation', () => {
  let component: LessonPronunciation;
  let fixture: ComponentFixture<LessonPronunciation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonPronunciation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPronunciation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
