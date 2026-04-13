import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIcon, MatTooltipModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUser, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser !== undefined) {
        this.userService.saveUser(newUser);
      }
    });
  }
}
