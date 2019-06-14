import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListManagementComponent } from './product-list-management.component';

describe('ProductListManagementComponent', () => {
  let component: ProductListManagementComponent;
  let fixture: ComponentFixture<ProductListManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
