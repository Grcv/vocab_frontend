import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCardLessonComponent } from './word-card-lesson';

describe('WordCardLessonComponent', () => {
  let component: WordCardLessonComponent;
  let fixture: ComponentFixture<WordCardLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordCardLessonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCardLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
