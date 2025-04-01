import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageExampleComponent } from './admin-manage-example.component';

describe('AdminManageExampleComponent', () => {
  let component: AdminManageExampleComponent;
  let fixture: ComponentFixture<AdminManageExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
