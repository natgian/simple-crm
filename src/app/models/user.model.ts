import { User, UserDB } from '../interfaces/user.interface';

export class UserModel implements User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  address: string;
  postalCode: string;
  city: string;

  /**
   * Creates a new UserModel instance with the provided user data.
   *
   * @param data - The user data to initialize the model with
   */
  constructor(data: Partial<User> = {}) {
    this.id = data.id;
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.email = data.email ?? '';
    this.birthDate = data.birthDate ?? '';
    this.address = data.address ?? '';
    this.postalCode = data.postalCode ?? '';
    this.city = data.city ?? '';
  }

  /**
   * Converts the UserModel to a snake case object for database insertion.
   *
   * @returns - The new object in snake case
   */
  toSnakeCase(): Omit<UserDB, 'id'> {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      birth_date: this.birthDate,
      address: this.address,
      postal_code: this.postalCode,
      city: this.city,
    };
  }

  /**
   * Converts a snake case database object to a UserModel instance in camel case.
   *
   * @param data - The object from the database to convert
   * @returns - The new object in camel case
   */
  static toCamelCase(data: UserDB): UserModel {
    return new UserModel({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      birthDate: data.birth_date,
      address: data.address,
      postalCode: data.postal_code,
      city: data.city,
    });
  }

  /**
   * Returns a string with the full name (first name and last name).
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
