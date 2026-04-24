import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserBasics } from './dialog-edit-user-basics';

describe('DialogEditUserBasics', () => {
  let component: DialogEditUserBasics;
  let fixture: ComponentFixture<DialogEditUserBasics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditUserBasics],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserBasics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
