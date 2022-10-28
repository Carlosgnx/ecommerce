export interface User {
  name: string;
  lastname: string;
  address?: Address;
}

interface Address {
  street: string;
  extNumber: number;
  intNumber?: number;
  postalCode: number;
  city: string;
  country: string;
}
