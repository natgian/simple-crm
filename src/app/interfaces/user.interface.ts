export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  address: string;
  postalCode: string;
  city: string;
}

export interface UserDB {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  address: string;
  postal_code: string;
  city: string;
}
