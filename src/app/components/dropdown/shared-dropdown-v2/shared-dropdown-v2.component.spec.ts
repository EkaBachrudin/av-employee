import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDropdownV2Component } from './shared-dropdown-v2.component';

describe('SharedDropdownV2Component', () => {
  let component: SharedDropdownV2Component;
  let fixture: ComponentFixture<SharedDropdownV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDropdownV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDropdownV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
