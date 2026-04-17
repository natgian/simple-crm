import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIcon, MatTooltipModule, MatTableModule, DatePipe],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  readonly dialog = inject(MatDialog);
  supabaseService = inject(SupabaseService);
  users = this.supabaseService.userList;

  displayedColumns: string[] = ['first-name', 'birth-date', 'postal-code', 'city'];
  dataSource = this.users;

  openDialog(): void {
    this.dialog.open(DialogAddUser);
  }
}
