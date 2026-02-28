import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Idioms } from './idioms';

describe('Idioms', () => {
  let component: Idioms;
  let fixture: ComponentFixture<Idioms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Idioms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Idioms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
