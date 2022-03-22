// Libraries
import { useReducer } from 'react';
// Types
import { HotelState } from '../@types/general';

export const initialState: HotelState = { loadingHotels: false };

export const reducerHotel = (state, action) => {
  if (action.type === 'FILTER_HOTELS') {
    return { ...state, loadingHotels: true };
  } else if (action.type === 'FILTER_HOTELS_SUCCESS') {
    return { ...state, loadingHotels: false };
  }

  return state;
};
