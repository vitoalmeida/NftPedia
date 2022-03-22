export interface Hotel {
  id: string;
  name: string;
  country: string;
  city: string;
  price: number;
  images: string[];
  date_start: string;
  date_end: string;
  stars: number;
  rating: number;
  description: string;
}

export interface Filter {
  goingTo?: string | string[];
  travelers?: string | string[];
  price?: string | string[];
  stars?: string | string[];
  checkIn?: string | string[];
  checkOut?: string | string[];
}

export interface InitialValues {
  goingTo?: string;
  travelers?: number;
  checkIn?: Date | null;
  checkOut?: Date | null;
}

export interface InitialValuesError {
  goingTo?: string;
  travelers?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface HotelState {
  loadingHotels: boolean;
}
