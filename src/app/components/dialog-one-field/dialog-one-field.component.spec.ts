import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOneFieldComponent } from './dialog-one-field.component';

describe('DialogOneFieldComponent', () => {
  let component: DialogOneFieldComponent;
  let fixture: ComponentFixture<DialogOneFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogOneFieldComponent]
    });
    fixture = TestBed.createComponent(DialogOneFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
