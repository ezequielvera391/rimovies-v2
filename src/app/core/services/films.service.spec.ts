import { TestBed } from '@angular/core/testing';

import { FilmsService } from './films.service';
import { HttpClientModule } from '@angular/common/http';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FilmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
