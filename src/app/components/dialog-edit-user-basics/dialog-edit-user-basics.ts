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
import { SupabaseService } from '../../services/supabase.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-dialog-edit-user-basics',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-edit-user-basics.html',
  styleUrl: './dialog-edit-user-basics.scss',
})
export class DialogEditUserBasics {
  readonly data = inject<UserModel>(MAT_DIALOG_DATA);
  private supabaseService = inject(SupabaseService);
  readonly dialogRef = inject(MatDialogRef<DialogEditUserBasics>);
  private fb = inject(FormBuilder);
  public loading = false;

  userForm: FormGroup = this.fb.group({
    firstName: [this.data.firstName, [Validators.required, Validators.minLength(2)]],
    lastName: [this.data.lastName, [Validators.required, Validators.minLength(2)]],
  });

  /**
   * Closes the dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Validates and submits the form, saves the updated user and closes the dialog.
   */
  async onSubmit(): Promise<void> {
    if (this.userForm.valid && this.data.id) {
      this.loading = true;
      this.userForm.disable();

      try {
        await this.supabaseService.updateUserName(this.data.id, this.userForm.getRawValue());
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
