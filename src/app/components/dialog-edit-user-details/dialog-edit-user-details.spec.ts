import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditUserDetails } from './dialog-edit-user-details';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogEditUserDetails', () => {
  let component: DialogEditUserDetails;
  let fixture: ComponentFixture<DialogEditUserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserDetails],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }, // die Dialog-Daten mocken
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
