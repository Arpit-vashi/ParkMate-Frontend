import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotManagementComponent } from './parking-lot-management.component';

describe('ParkingLotManagementComponent', () => {
  let component: ParkingLotManagementComponent;
  let fixture: ComponentFixture<ParkingLotManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingLotManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParkingLotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
