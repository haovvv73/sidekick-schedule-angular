import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowNoTabLayoutComponent } from './window-no-tab-layout.component';

describe('WindowNoTabLayoutComponent', () => {
  let component: WindowNoTabLayoutComponent;
  let fixture: ComponentFixture<WindowNoTabLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindowNoTabLayoutComponent]
    });
    fixture = TestBed.createComponent(WindowNoTabLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
