import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageQuizzesComponent } from './admin-manage-quizzes.component';

describe('AdminManageQuizzesComponent', () => {
  let component: AdminManageQuizzesComponent;
  let fixture: ComponentFixture<AdminManageQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManageQuizzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
