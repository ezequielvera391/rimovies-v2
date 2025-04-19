import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image with correct src', ()=> {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('[data-testid="logo-img"]');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/images/logos/logo-texto.png');
  })

   it('should render a router-outlet', () => {
     const compiled = fixture.nativeElement as HTMLElement;
     const outlet = compiled.querySelector('router-outlet');
     expect(outlet).toBeTruthy();
   });
});
