import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(environment.supabaseURL, environment.supabaseKey);
  userChannels;

  constructor() {
    this.userChannels = this.supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
            const newUser = new UserModel(payload.new);
            console.log('added new user:', newUser);

            break;
          case 'DELETE':
            console.log('user deleted');
            break;
          case 'UPDATE':
            console.log('user updated');
            break;
        }
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.userChannels);
  }

  async addUser(user: UserModel) {
    const userData = user.formatForDB();
    const { data, error } = await this.supabase.from('users').insert([userData]).select();

    if (error) throw error;
    return data;
  }
}
