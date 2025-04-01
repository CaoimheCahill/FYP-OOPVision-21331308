import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExampleFormComponent } from './admin-example-form.component';

describe('AdminExampleFormComponent', () => {
  let component: AdminExampleFormComponent;
  let fixture: ComponentFixture<AdminExampleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExampleFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExampleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
