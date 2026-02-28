import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabVocabulary } from './tab-vocabulary';

describe('TabVocabulary', () => {
  let component: TabVocabulary;
  let fixture: ComponentFixture<TabVocabulary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabVocabulary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabVocabulary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
