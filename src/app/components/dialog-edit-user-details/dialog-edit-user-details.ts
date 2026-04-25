import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../utils/formatDate';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-dialog-edit-user-details',
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
    MatDatepickerModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-user-details.html',
  styleUrl: './dialog-edit-user-details.scss',
})
export class DialogEditUserDetails {
  readonly data = inject<UserModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogEditUserDetails>);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  public loading = false;

  userForm: FormGroup = this.fb.group({
    email: [
      this.data.email,
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    birthDate: [this.data.birthDate, [Validators.required]],
    address: [this.data.address, [Validators.required, Validators.minLength(3)]],
    postalCode: [this.data.postalCode, [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
    city: [this.data.city, [Validators.required, Validators.minLength(2)]],
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid && this.data.id) {
      this.loading = true;
      this.userForm.disable();

      try {
        await this.userService.saveUpdatedUserDetails(this.data.id, this.userForm.getRawValue());
        this.dialogRef.close();
      } catch (error) {
        console.error(error);
      } finally {
        this.userForm.enable();
        this.loading = false;
      }
    }
  }
}
