import { TestBed } from '@angular/core/testing';

import { SettingUIService } from './setting-ui.service';

describe('SettingUIService', () => {
  let service: SettingUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
