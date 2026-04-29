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

  /**
   * Fetches all users on initialization and sets up realtime channel to detect database changes.
   */
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

  /**
   * Removes the realtime chanel when the service is destroyed.
   */
  ngOnDestroy() {
    this.supabase.removeChannel(this.userChannels);
  }

  /**
   * Fetches all users from the database and updates the userList signal.
   */
  async getAllUsers() {
    try {
      const { data: users, error } = await this.supabase.from('users').select('*');
      if (error) throw error;
      this.userList.set(users?.map((user) => UserModel.toCamelCase(user)) ?? []);
    } catch (error) {
      console.error('Error while loading the users', error);
    }
  }

  /**
   * Fetches a single user from the database and sets the user signal.
   *
   * @param id - The ID of the user to fetch.
   */
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

  /**
   * Adds a user to the database.
   *
   * @param user - The user to add
   */
  async addUser(user: UserModel) {
    try {
      const userData = user.toSnakeCase();
      const { error } = await this.supabase.from('users').insert([userData]).select();
      if (error) throw error;
    } catch (error) {
      console.error('Error while adding user', error);
      throw error;
    }
  }

  /**
   * Deletes a user from the database.
   *
   * @param id - The ID of the user to delete
   */
  async deleteUser(id: string) {
    try {
      const { error } = await this.supabase.from('users').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to delete the user', error);
    }
  }

  /**
   * Updates the first name and last name of a user in the database.
   *
   * @param id - The ID of the user to update
   * @param data - Object containing the updated firstName and lastName
   */
  async updateUserName(id: string, data: Partial<User>) {
    try {
      const { error } = await this.supabase
        .from('users')
        .update({ first_name: data.firstName, last_name: data.lastName })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to update users name', error);
    }
  }

  /**
   * Updates the user details in the database.
   *
   * @param id - The ID of the user to update
   * @param data - Object containing the updated details (email, address, postalCode,
   * city and birthDate)
   */
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
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error while trying to update user details', error);
    }
  }
}
