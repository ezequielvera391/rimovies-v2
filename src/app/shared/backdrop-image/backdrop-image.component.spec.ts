import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropImageComponent } from './backdrop-image.component';
import { By } from '@angular/platform-browser';

describe('BackdropImageComponent', () => {
  let component: BackdropImageComponent;
  let fixture: ComponentFixture<BackdropImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BackdropImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    component.imageUrl = 'https://example.com/image.jpg';
    fixture.detectChanges();

    const backdropEl = fixture.debugElement.query(By.css('.backdrop'));
    expect(backdropEl).toBeTruthy();
  });

  it('should bind the imageUrl input correctly', () => {
    const testUrl = 'https://example.com/test.jpg';
    component.imageUrl = testUrl;
    fixture.detectChanges();

    const backdropEl = fixture.debugElement.query(By.css('.backdrop'));
    const styles = backdropEl.nativeElement.style.backgroundImage;

    expect(styles).toContain(testUrl);
  });

  it('should apply the correct ngStyle background-image', () => {
    const testUrl = 'https://assets.site/image.png';
    component.imageUrl = testUrl;
    fixture.detectChanges();

    const backdropEl = fixture.debugElement.query(By.css('.backdrop'));
    const styleValue = backdropEl.nativeElement.style.backgroundImage;

    expect(styleValue).toBe(`url("${testUrl}")`);
  });
});
