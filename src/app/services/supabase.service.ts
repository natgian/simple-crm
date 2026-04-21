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
  user = signal<UserModel | null>(null);

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
            const deletedUserId = payload.old['id'];
            this.userList.update((list) => list.filter((user) => user.id !== deletedUserId));
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
    try {
      const { data: users, error } = await this.supabase.from('users').select('*');
      if (error) throw error;
      this.userList.set(users?.map((user) => UserModel.toCamelCase(user)) ?? []);
    } catch (error) {
      console.error('Error while loading the users', error);
    }
  }

  async getSingleUser(id: string) {
    try {
      const { data: user, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      this.user.set(UserModel.toCamelCase(user));

      if (error) throw error;

      console.log(this.user());
    } catch (error) {
      console.error('Error while loading single user', error);
    }
  }

  async addUser(user: UserModel) {
    try {
      const userData = user.toSnakeCase();
      const { data, error } = await this.supabase.from('users').insert([userData]).select();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error while adding user', error);
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const { error } = await this.supabase.from('users').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to delete the user', error);
    }
  }
}
