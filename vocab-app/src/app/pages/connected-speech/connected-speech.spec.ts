import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedSpeech } from './connected-speech';

describe('ConnectedSpeech', () => {
  let component: ConnectedSpeech;
  let fixture: ComponentFixture<ConnectedSpeech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedSpeech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedSpeech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
