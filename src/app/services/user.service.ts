import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { UserModel } from '../models/user.model';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabaseService = inject(SupabaseService);

  async saveUser(user: User) {
    await this.supabaseService.addUser(new UserModel(user));
  }
}
