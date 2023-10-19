import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowLayoutComponent } from './window-layout.component';

describe('WindowLayoutComponent', () => {
  let component: WindowLayoutComponent;
  let fixture: ComponentFixture<WindowLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindowLayoutComponent]
    });
    fixture = TestBed.createComponent(WindowLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
