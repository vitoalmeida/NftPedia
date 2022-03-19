// Libraries
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// API
import { getHotels } from '../services/api';
// Components
import Header from '../components/Header';
import HotelCard from '../components/HotelCard';
// Helpers
import generalHelpers from '../helpers/filter';
// Types
import { Hotel } from '../@types/general';

interface HotelList {
  hotelList: Hotel[];
}

const SearchHotel: React.FC<HotelList> = ({ hotelList }) => {
  // Route params
  const router = useRouter();
  const { goingTo, travelers, checkIn, checkOut } = router.query;

  // Filter states
  const [goingToFilter, setGoingToFilter] = useState(String(goingTo) || '');
  const [travelersFilter, setTravelersFilter] = useState(
    String(travelers) || ''
  );
  const [checkInFilter, setCheckInFilter] = useState(String(checkIn) || '');
  const [checkOutFilter, setCheckOutFilter] = useState(String(checkOut) || '');
  const [starsFilter, setStarsFilter] = useState(0);

  return (
    <div>
      <Header />
      <div className="flex flex-col pt-16 bg-[#F4F4F4] items-center">
        <input
          type="text"
          placeholder="Search..."
          onChange={event => setGoingToFilter(event.target.value)}
          value={goingToFilter}
        />
        {generalHelpers
          .filterHotels(
            {
              goingTo: 'a', //goingToFilter,
              travelers: travelersFilter,
              checkIn: checkInFilter,
              checkOut: checkOutFilter,
              stars: starsFilter,
            },
            hotelList
          )
          .map((hotel, key) => {
            return <HotelCard hotel={hotel} />;
          })}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const hotelList = await getHotels();

  return {
    props: {
      hotelList,
    },
  };
}

export default SearchHotel;
