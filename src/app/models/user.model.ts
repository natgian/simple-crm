import { User } from '../interfaces/user.interface';

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

  formatForDB() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      birth_date: this.birthDate,
      address: this.address,
      postal_code: this.postalCode,
      city: this.city,
    };
  }
}
