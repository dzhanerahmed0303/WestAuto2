export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  description?: string;
  owners?: number;
  fuel?: string;
  mileage?: number;
  hp?: number;
  gearbox?: string;
  body_type?: string;
  seats?: number;
  doors?: number;
  engine_size?: number;
  weight?: number;
  warranty?: boolean;
  emission_class?: string;
  co2emissions?: number;
  colour?: string;
  image?: string;
  reviews?: Review[];
}

export interface User {
  username: string;
  password: string;
  name?: string;
  surname?: string;
  favorite?: Car[];
}

export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: Date;
}

export interface Contact {
  name: string;
  achternaam: string;
  email: string;
  telnr: string;
  bericht: string;
}

declare module "express-session" {
  interface SessionData {
    user?: {
      _id?: string;
      username: string;
    };
  }
}
