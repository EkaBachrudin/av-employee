import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDropdownV1Component } from './shared-dropdown-v1.component';

describe('SharedDropdownV1Component', () => {
  let component: SharedDropdownV1Component;
  let fixture: ComponentFixture<SharedDropdownV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDropdownV1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDropdownV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
