import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardComponent } from './base-card.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: BaseCardComponent;
  let fixture: ComponentFixture<BaseCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should bind image src and alt correctly', () => {
    component.imageUrl = 'https://example.com/image.jpg';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector(
      '[data-testid="card-img"]'
    ) as HTMLImageElement;
    expect(img.src).toContain('https://example.com/image.jpg');
    expect(img.alt).toBe('card');
  });

  it('should apply correct ngClass based on size input', () => {
    component.size = 'small';
    fixture.detectChanges();

    const div = fixture.debugElement.query(By.css('.card-container'));
    expect(div.nativeElement.classList).toContain('card-small');
  });

  it('should not navigate if goToUrl is undefined', () => {
    spyOn(router, 'navigate');
    component.goToUrl = undefined;

    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.card-container'));
    div.triggerEventHandler('click', null);

    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to goToUrl on click', () => {
    spyOn(router, 'navigate');
    component.goToUrl = '/films/123';

    fixture.detectChanges();
    const div = fixture.debugElement.query(By.css('.card-container'));
    div.triggerEventHandler('click', null);

    expect(router.navigate).toHaveBeenCalledWith(['/films/123']);
  });
});
