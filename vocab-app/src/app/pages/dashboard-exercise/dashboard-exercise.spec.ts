import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExercise } from './dashboard-exercise';

describe('DashboardExercise', () => {
  let component: DashboardExercise;
  let fixture: ComponentFixture<DashboardExercise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardExercise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExercise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
