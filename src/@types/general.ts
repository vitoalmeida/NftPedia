export interface NFT {
  id: string | null;
  contractAddress: string | null;
  image: string | null;
  title: string | null;
  description: string | null;
  attributes: string | null;
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
  walletAddress?: string;
  nftAddress?: string;
}

export interface InitialValuesError {
  walletAddress?: string;
  nftAddress?: string;
}

export interface HotelState {
  loadingHotels: boolean;
}
