import { Hotel, Filter } from '../@types/general';

function filterHotels(filter: Filter, hotelsList: Hotel[]): Hotel[] {
  let filteredHotel = hotelsList;

  if (filter.goingTo) {
    filteredHotel = filteredHotel.filter(value => {
      if (
        value.city
          .toLowerCase()
          .includes((filter.goingTo as string).toLowerCase())
      ) {
        return value;
      }
    });
  }

  // if(filter.travelers) {
  //   filteredHotel = hotelsList.filter(value => {
  //     if (value.city.toLowerCase().includes(filter.goingTo.toLowerCase())) {
  //       return value;
  //     }
  //   });
  // }

  if (filter.price) {
    filteredHotel = filteredHotel.filter(value => {
      if (
        filter.price &&
        value.price < Number(filter.price[1]) &&
        value.price > Number(filter.price[0])
      ) {
        return value;
      }
    });
  }

  if (filter.stars) {
    filteredHotel = filteredHotel.filter(value => {
      if (value.stars === Number(filter.stars)) {
        return value;
      }
    });
  }

  return filteredHotel;
}

export default {
  filterHotels,
};
