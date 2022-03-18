import Filter from '../@types/hotels.ts';

export async function getHotels() {
  const hotelList = await import('./hotels.json').then(hotelList =>
    console.log(hotelList)
  );
}
