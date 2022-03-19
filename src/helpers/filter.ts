import { Hotel } from '../@types/general';

function filterHotels(
  filter: {
    goingTo: string;
    travelers: string;
    checkIn: string;
    checkOut: string;
    stars: number;
  },
  hotelsList: Hotel[]
): Hotel[] {
  let filteredHotel;

  if (filter.goingTo) {
    filteredHotel = hotelsList.filter(value => {
      if (value.city.toLowerCase().includes(filter.goingTo.toLowerCase())) {
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

  if (filter.stars) {
    filteredHotel = hotelsList.filter(value => {
      if (value.stars === filter.stars) {
        return value;
      }
    });
  }

  return filteredHotel;
}

export default {
  filterHotels,
};
