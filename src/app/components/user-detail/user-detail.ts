import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private userId: string | null;

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
  }
}
