import { Injectable, signal } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { User, UserDB } from '../interfaces/user.interface';

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
            const updatedUser = UserModel.toCamelCase(payload.new as UserDB);
            this.user.set(updatedUser);
            this.userList.update((list) =>
              list.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
            );
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

      if (error) throw error;
      this.user.set(UserModel.toCamelCase(user));
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

  async deleteUser(id: string) {
    try {
      const { error } = await this.supabase.from('users').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to delete the user', error);
    }
  }

  async updateUserName(id: string, data: Partial<User>) {
    try {
      const { error } = await this.supabase
        .from('users')
        .update({ first_name: data.firstName, last_name: data.lastName })
        .eq('id', id)
        .select();

      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to update users name', error);
    }
  }

  async updateUserDetails(id: string, data: Partial<User>) {
    try {
      const { error } = await this.supabase
        .from('users')
        .update({
          email: data.email,
          address: data.address,
          postal_code: data.postalCode,
          city: data.city,
          birth_date: data.birthDate,
        })
        .eq('id', id)
        .select();

      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to update user details', error);
    }
  }
}
