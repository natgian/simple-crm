import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../utils/dateFormats';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-add-user',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    provideLuxonDateAdapter(),
  ],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  readonly dialogRef = inject(MatDialogRef<DialogAddUser>);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  public loading = false;

  userForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    birthDate: [null, [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(3)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
  });

  /**
   * Closes the dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Validates and submits the form, saves the new user and closes the dialog.
   */
  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      this.loading = true;
      this.userForm.disable();
      const newUser = this.getFormData();

      try {
        await this.userService.saveUser(newUser);
        this.dialogRef.close();
      } catch (error) {
        console.error(error);
      } finally {
        this.userForm.enable();
        this.loading = false;
      }
    }
  }

  /**
   * Extracts and returns the current form values as a new user object.
   * @returns - The new user data object
   */
  getFormData() {
    const formValue = this.userForm.getRawValue();
    const newUser = { ...formValue };
    return newUser;
  }
}
