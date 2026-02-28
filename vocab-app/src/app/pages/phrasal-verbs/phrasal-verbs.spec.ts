import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasalVerbs } from './phrasal-verbs';

describe('PhrasalVerbs', () => {
  let component: PhrasalVerbs;
  let fixture: ComponentFixture<PhrasalVerbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhrasalVerbs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhrasalVerbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
