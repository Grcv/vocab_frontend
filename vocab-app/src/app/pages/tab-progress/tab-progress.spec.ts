import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProgress } from './tab-progress';

describe('TabProgress', () => {
  let component: TabProgress;
  let fixture: ComponentFixture<TabProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
