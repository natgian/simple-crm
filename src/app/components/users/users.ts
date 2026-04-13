import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIcon, MatTooltipModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
      }
    });
  }
}
