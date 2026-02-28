import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verbs } from './verbs';

describe('Verbs', () => {
  let component: Verbs;
  let fixture: ComponentFixture<Verbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verbs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Verbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
