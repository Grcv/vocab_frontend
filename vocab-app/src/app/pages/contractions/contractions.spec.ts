import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contractions } from './contractions';

describe('Contractions', () => {
  let component: Contractions;
  let fixture: ComponentFixture<Contractions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contractions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contractions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
