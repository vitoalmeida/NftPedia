import { Hotel, Filter } from '../@types/general';

function filterHotels(filter: Filter, hotelsList: Hotel[]): Hotel[] {
  let filteredHotel = hotelsList;

  // Filter hotels by location
  if (filter.goingTo) {
    filteredHotel = filteredHotel.filter(hotel => {
      if (
        hotel.city
          .toLowerCase()
          .includes((filter.goingTo as string).toLowerCase())
      ) {
        return hotel;
      }
    });
  }

  // Filter hotels by travelers
  // if(filter.travelers) {
  //   filteredHotel = hotelsList.filter(hotel => {
  //     if (hotel.city.toLowerCase().includes(filter.goingTo.toLowerCase())) {
  //       return hotel;
  //     }
  //   });
  // }

  // Filter hotels by price
  if (filter.price) {
    filteredHotel = filteredHotel.filter(hotel => {
      if (
        filter.price &&
        hotel.price < Number(filter.price[1]) &&
        hotel.price > Number(filter.price[0])
      ) {
        return hotel;
      }
    });
  }

  // Filter hotels by stars
  if (filter.stars && filter.stars !== '0') {
    filteredHotel = filteredHotel.filter(hotel => {
      if (hotel.stars === Number(filter.stars)) {
        return hotel;
      }
    });
  }

  // Filter hotels by date
  if (filter.checkIn && filter.checkOut) {
    let checkIn = new Date(filter.checkIn as string);
    let checkOut = new Date(filter.checkOut as string);

    filteredHotel = filteredHotel.filter(hotel => {
      if (
        checkIn > new Date(hotel.date_start) &&
        checkOut < new Date(hotel.date_end)
      ) {
        return hotel;
      }
    });
  }

  return filteredHotel;
}

export default {
  filterHotels,
};
