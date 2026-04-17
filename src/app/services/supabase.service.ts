import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { UserDB } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(environment.supabaseURL, environment.supabaseKey);
  userChannels;

  userList = signal<UserModel[]>([]);

  constructor() {
    this.getAllUsers().catch((error) => console.error('Error loading users:', error));

    this.userChannels = this.supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
            const newUser = UserModel.toCamelCase(payload.new as UserDB);
            this.userList.update((list) => [...list, newUser]);
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

  async getAllUsers() {
    const { data: users, error } = await this.supabase.from('users').select('*');
    if (error) throw error;

    this.userList.set(users?.map((user) => UserModel.toCamelCase(user)) ?? []);
  }

  async addUser(user: UserModel) {
    const userData = user.toSnakeCase();
    const { data, error } = await this.supabase.from('users').insert([userData]).select();

    if (error) throw error;
    return data;
  }
}
