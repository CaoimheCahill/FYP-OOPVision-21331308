import { TestBed } from '@angular/core/testing';

import { VisualExampleService } from './visual-example.service';

describe('VisualExampleService', () => {
  let service: VisualExampleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisualExampleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
