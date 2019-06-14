import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewManagementComponent } from './product-view-management.component';

describe('ProductViewManagementComponent', () => {
  let component: ProductViewManagementComponent;
  let fixture: ComponentFixture<ProductViewManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
