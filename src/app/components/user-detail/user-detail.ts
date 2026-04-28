import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserBasics } from '../dialog-edit-user-basics/dialog-edit-user-basics';
import { DialogEditUserDetails } from '../dialog-edit-user-details/dialog-edit-user-details';

@Component({
  selector: 'app-user-detail',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  readonly dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  supabaseService = inject(SupabaseService);
  currentUser = this.supabaseService.user;

  /**
   * Fetches the user by ID from the URL on component initialization.
   */
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) this.supabaseService.getSingleUser(userId);
  }

  /**
   * Opens a dialog to edit the user's first and last name.
   * Passes the current user data to prefill the form.
   */
  openEditBasicsDialog(): void {
    this.dialog.open(DialogEditUserBasics, { data: this.currentUser() });
  }

  /**
   * Opens a dialog to edit the user's detail information.
   * Passes the current user data to prefill the form.
   */
  openEditDetailsDialog(): void {
    this.dialog.open(DialogEditUserDetails, { data: this.currentUser() });
  }
}
