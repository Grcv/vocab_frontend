import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonGrammar } from './lesson-grammar';

describe('LessonGrammar', () => {
  let component: LessonGrammar;
  let fixture: ComponentFixture<LessonGrammar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonGrammar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonGrammar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
