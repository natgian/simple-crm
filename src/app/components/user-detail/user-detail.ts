import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatDividerModule, DatePipe],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private userId: string | null;
  supabaseService = inject(SupabaseService);
  currentUser = this.supabaseService.user;

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.userId) {
      this.supabaseService.getSingleUser(this.userId);
    }
  }
}
