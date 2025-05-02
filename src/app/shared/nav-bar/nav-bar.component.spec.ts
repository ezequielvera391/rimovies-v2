import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let compiled: HTMLElement;

  const mockNavBarLinks = [
    { name: 'Home', path: '/' },
    { name: 'Films', path: '/films' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    component.navLinks = mockNavBarLinks;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should bind the logoPath correctly', () => {
    const logoImg = compiled.querySelector(
      '[data-testid="logo-img"]'
    ) as HTMLImageElement;
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('assets/images/logos/logo-texto.png');
  });

  it('should render nav links with ngFor', () => {
    const navItems = compiled.querySelectorAll('[data-testid^="nav-item-"]');
    expect(navItems.length).toBe(mockNavBarLinks.length);
  });

  it('should call redirectTo on click', () => {
    spyOn(component, 'redirectTo');
    const firstNavItem = compiled.querySelector(
      '[data-testid="nav-item-0"]'
    ) as HTMLElement;
    firstNavItem.click();
    expect(component.redirectTo).toHaveBeenCalledWith('/');
  });

  it('should not call redirectTo on other key presses', () => {
    spyOn(component, 'redirectTo');
    const navItem = compiled.querySelector(
      '[data-testid="nav-item-0"]'
    ) as HTMLElement;
    const otherKeyEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });

    navItem.dispatchEvent(otherKeyEvent);

    expect(component.redirectTo).not.toHaveBeenCalled();
  });

  it('should set isScrolled to true when scrolling via real window event', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(120);

    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(component.isScrolled).toBeTrue();
  });

  it('should navigate to path when redirectTo is called', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.redirectTo('/films');
    expect(spy).toHaveBeenCalledWith(['/films']);
  });

  it('should call redirectTo when pressing Enter or Space', () => {
    spyOn(component, 'redirectTo');
    const firstNavItem = compiled.querySelector(
      '[data-testid="nav-item-0"]'
    ) as HTMLElement;
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });

    firstNavItem.dispatchEvent(enterEvent);
    firstNavItem.dispatchEvent(spaceEvent);

    expect(component.redirectTo).toHaveBeenCalledWith('/');
    expect(component.redirectTo).toHaveBeenCalledTimes(2);
  });

  it('should set isScrolled to true when window scrollY is greater than 50', () => {
    spyOnProperty(window, 'scrollY').and.returnValue(100);
    component.onWindowScroll();
    expect(component.isScrolled).toBeTrue();
  });

  it('should apply the "scrolled" class when isScrolled is true', () => {
    component.isScrolled = true;
    fixture.detectChanges();
    const navBar = compiled.querySelector('[data-testid="nav-bar"]');
    expect(navBar?.classList).toContain('scrolled');
  });

  it('should not throw if navLinks is undefined', () => {
    component.navLinks = undefined!;
    fixture.detectChanges();
    const navBar = compiled.querySelector('[data-testid="nav-bar"]');
    expect(navBar).toBeTruthy();
  });

  it('should render 0 nav items if navLinks is undefined', () => {
    component.navLinks = undefined!;
    fixture.detectChanges();
    const navItems = compiled.querySelectorAll('[data-testid^="nav-item-"]');
    expect(navItems.length).toBe(0);
  });

  it('each nav item should have tabindex="0"', () => {
    const navItems = compiled.querySelectorAll('[data-testid^="nav-item-"]');
    navItems.forEach((item) => {
      expect(item.getAttribute('tabindex')).toBe('0');
    });
  });

  it('logo image should have correct alt attribute', () => {
    const logoImg = compiled.querySelector(
      '[data-testid="logo-img"]'
    ) as HTMLImageElement;
    expect(logoImg.alt).toBe('logo');
  });
});
