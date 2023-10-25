import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeDetailComponent } from './analyze-detail.component';

describe('AnalyzeDetailComponent', () => {
  let component: AnalyzeDetailComponent;
  let fixture: ComponentFixture<AnalyzeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyzeDetailComponent]
    });
    fixture = TestBed.createComponent(AnalyzeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
