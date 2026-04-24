import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserDetails } from './dialog-edit-user-details';

describe('DialogEditUserDetails', () => {
  let component: DialogEditUserDetails;
  let fixture: ComponentFixture<DialogEditUserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
