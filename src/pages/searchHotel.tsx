// Libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
// API
import { getHotels } from '../services/api';
// Components
import Header from '../components/Header';
import RectangleHotelCard from '../components/RectangleHotelCard';
import SquareHotelCard from '../components/SquareHotelCard';
// Helpers
import generalHelpers from '../helpers/filter';
// Types
import { Hotel } from '../@types/general';

interface HotelList {
  hotelList: Hotel[];
}

// console.log(screen.width < 640);

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

  // Window width state
  const [isMobile, setMobile] = useState<boolean>();

  // Function to get screen type
  const updateMedia = () => {
    setMobile(window.innerWidth < 770);
  };

  useEffect(() => {
    setMobile(window.innerWidth < 770);
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <div>
      <Head>
        <title>Search - Nextpedia</title>
      </Head>

      <Header />
      <div className="flex flex-col pt-20 md:pt-16 bg-[#F4F4F4] items-center">
        {/* <input
          type="text"
          className="mb-8"
          placeholder="Search..."
          onChange={event => setGoingToFilter(event.target.value)}
          value={goingToFilter}
        /> */}
        {(goingToFilter
          ? generalHelpers.filterHotels(
              {
                goingTo: goingToFilter,
                travelers: travelersFilter,
                checkIn: checkInFilter,
                checkOut: checkOutFilter,
                stars: starsFilter,
              },
              hotelList
            )
          : hotelList
        ).map((hotel, key) => {
          if (isMobile) {
            return (
              <div key={key}>
                <SquareHotelCard hotel={hotel} />
              </div>
            );
          } else {
            return (
              <div key={key}>
                <RectangleHotelCard hotel={hotel} />
              </div>
            );
          }
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
