import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditUserBasics } from './dialog-edit-user-basics';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('DialogEditUserBasics', () => {
  let component: DialogEditUserBasics;
  let fixture: ComponentFixture<DialogEditUserBasics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserBasics],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserBasics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
