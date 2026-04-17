import { User, UserDB } from '../interfaces/user.interface';

export class UserModel implements User {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  postalCode: string;
  city: string;

  constructor(data: Partial<User> = {}) {
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.birthDate = data.birthDate ?? '';
    this.address = data.address ?? '';
    this.postalCode = data.postalCode ?? '';
    this.city = data.city ?? '';
  }

  toSnakeCase() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      birth_date: this.birthDate,
      address: this.address,
      postal_code: this.postalCode,
      city: this.city,
    };
  }

  static toCamelCase(data: UserDB): UserModel {
    return new UserModel({
      firstName: data.first_name,
      lastName: data.last_name,
      birthDate: data.birth_date,
      address: data.address,
      postalCode: data.postal_code,
      city: data.city,
    });
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
