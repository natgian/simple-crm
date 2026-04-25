import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogAddUser } from './dialog-add-user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogAddUser', () => {
  let component: DialogAddUser;
  let fixture: ComponentFixture<DialogAddUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddUser],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
