import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabExercise } from './tab-exercise';

describe('TabExercise', () => {
  let component: TabExercise;
  let fixture: ComponentFixture<TabExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
