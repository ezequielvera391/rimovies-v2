import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerComponent } from './divider.component';
import { By } from '@angular/platform-browser';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DividerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a div with the class "divider"', () => {
    const div = fixture.debugElement.query(By.css('.divider'));
    expect(div).toBeTruthy();
  });

});
