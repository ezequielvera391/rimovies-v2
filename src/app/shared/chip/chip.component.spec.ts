import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipComponent } from './chip.component';
import { By } from '@angular/platform-browser';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    component.label = 'Test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const chipEl = fixture.debugElement.query(By.css('.chip'));
    expect(chipEl).toBeTruthy();
  });

  it('should bind the correct label', () => {
    component.label = 'Angular';
    fixture.detectChanges();

    const chipEl = fixture.debugElement.query(By.css('.chip'));
    expect(chipEl.nativeElement.textContent).toContain('Angular');
  });

  it('should hide remove button for default', () => {
    const btn = fixture.debugElement.query(By.css('.close-btn'));
    expect(btn).toBeFalsy();
  });


  it('should apply chip--removable class when removable is true', () => {
    component.removable = true;
    fixture.detectChanges();

    const chipEl = fixture.debugElement.query(By.css('.chip'));
    expect(chipEl.nativeElement.classList).toContain('chip--removable');
  });

  it('should not apply chip--removable class when removable is false', () => {
    component.removable = false;
    fixture.detectChanges();

    const chipEl = fixture.debugElement.query(By.css('.chip'));
    expect(chipEl.nativeElement.classList).not.toContain('chip--removable');
  });

  it('should show remove button if removable is true', () => {
    component.removable = true;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('.close-btn'));
    expect(btn).toBeTruthy();
  });

  it('should hide remove button if removable is false', () => {
    component.removable = false;
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('.close-btn'));
    expect(btn).toBeFalsy();
  });

  it('should call remove method when close button is clicked', () => {
    component.removable = true;
    fixture.detectChanges();

    spyOn(component, 'remove');
    const btn = fixture.debugElement.query(By.css('.close-btn'));
    btn.triggerEventHandler('click');
    expect(component.remove).toHaveBeenCalled();
  });
});
