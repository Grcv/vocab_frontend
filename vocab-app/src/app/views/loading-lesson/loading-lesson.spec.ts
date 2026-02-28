import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLesson } from './loading-lesson';

describe('LoadingLesson', () => {
  let component: LoadingLesson;
  let fixture: ComponentFixture<LoadingLesson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingLesson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingLesson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
