import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropImageComponent } from './backdrop-image.component';

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
});
