import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {

  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Router],
      providers: [AuthService]
    });

    router = TestBed.get(Router);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
