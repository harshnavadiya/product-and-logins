import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashManagementComponent } from './dash-management.component';

describe('DashManagementComponent', () => {
  let component: DashManagementComponent;
  let fixture: ComponentFixture<DashManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
