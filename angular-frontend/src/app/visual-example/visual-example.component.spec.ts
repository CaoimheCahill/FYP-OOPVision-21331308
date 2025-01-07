import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualExampleComponent } from './visual-example.component';

describe('VisualExampleComponent', () => {
  let component: VisualExampleComponent;
  let fixture: ComponentFixture<VisualExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
