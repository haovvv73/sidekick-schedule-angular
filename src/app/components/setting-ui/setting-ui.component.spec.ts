import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingUIComponent } from './setting-ui.component';

describe('SettingUIComponent', () => {
  let component: SettingUIComponent;
  let fixture: ComponentFixture<SettingUIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingUIComponent]
    });
    fixture = TestBed.createComponent(SettingUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
