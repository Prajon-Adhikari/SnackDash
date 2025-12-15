export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface Dishes {
  _id: string;
  name: string;
  price: string;
  description: string;
  variation: string[];
  image: string;
  rating?: number;
}

export interface Food {
  id: number;
  title: string;
  image: string;
  bg: string;
}
