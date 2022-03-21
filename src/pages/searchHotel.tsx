// Libraries
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ReactModal from 'react-modal';

// API
import { getHotels } from '../services/api';
// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import RectangleHotelCard from '../components/RectangleHotelCard';
import SquareHotelCard from '../components/SquareHotelCard';
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
  const { goingTo, travelers, checkIn, checkOut, stars, price } = router.query;

  // Filtered Hotels
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(
    generalHelpers.filterHotels(
      {
        goingTo: goingTo,
        travelers: travelers,
        checkIn: checkIn,
        checkOut: checkOut,
        stars: stars,
        price: price,
      },
      hotelList
    )
  );

  useEffect(() => {
    setFilteredHotels(
      generalHelpers.filterHotels(
        {
          goingTo: goingTo,
          travelers: travelers,
          checkIn: checkIn,
          checkOut: checkOut,
          stars: stars,
          price: price,
        },
        hotelList
      )
    );
  }, [router]);

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
    <div className="relative h-full bg-gradient-to-b from-[#F4F4F4] to-white">
      <Head>
        <title>Search - Nextpedia</title>
      </Head>
      <Header />
      <main className="flex flex-col pt-20 md:pt-16 items-center h-full duration-500">
        <div className="mt-10 w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem] duration-500 mb-[-2rem]">
          <h1 className="font-extrabold text-[1.7rem] text-black">
            Resultados para:{' '}
            <span className="text-dark-green">'{goingTo}'</span>
          </h1>
        </div>
        {(filteredHotels ? filteredHotels : hotelList).map((hotel, key) => {
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
        <ReactModal
          className="modal"
          overlayClassName="modal-overlay"
          isOpen={false}
        >
          <p>text</p>
        </ReactModal>
        <div></div>
      </main>
      {/* <div className="">
        <Footer />
      </div> */}
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
