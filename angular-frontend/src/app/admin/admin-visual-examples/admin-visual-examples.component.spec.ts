import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisualExamplesComponent } from './admin-visual-examples.component';

describe('AdminVisualExamplesComponent', () => {
  let component: AdminVisualExamplesComponent;
  let fixture: ComponentFixture<AdminVisualExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVisualExamplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVisualExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
