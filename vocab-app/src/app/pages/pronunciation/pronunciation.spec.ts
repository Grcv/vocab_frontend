import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pronunciation } from './pronunciation';

describe('Pronunciation', () => {
  let component: Pronunciation;
  let fixture: ComponentFixture<Pronunciation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pronunciation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pronunciation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
