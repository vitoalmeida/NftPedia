// Libraries
import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';
// API
import { getHotels } from '../services/api';
// Reducer
import { reducerHotel, initialState } from '../store/hotels';
// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import RectangleHotelCard from '../components/HotelCard/RectangleHotelCard';
import SquareHotelCard from '../components/HotelCard/SquareHotelCard';
// Helpers
import generalHelpers from '../helpers/filter';
// Types
import { Hotel } from '../@types/general';

interface HotelList {
  hotelList: Hotel[];
}

const SearchHotel: React.FC<HotelList> = ({ hotelList }) => {
  // Reducer
  const [hotelState, dispatch] = useReducer(reducerHotel, initialState);
  const { loadingHotels } = hotelState;
  console.log(loadingHotels);
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
    dispatch({ type: 'FILTER_HOTELS_SUCCESS' });
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
        <meta charSet="UTF-8" />
        <meta name="description" content="Search results" />
        <meta name="keywords" content="Hotels, Search, Booking" />
        <meta name="author" content="Vitor Machado" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Header />

      <main className="flex flex-col pt-20 md:pt-16 pb-20 items-center h-full duration-500">
        {loadingHotels ? (
          <div className="flex justify-center mt-10 duration-500">
            <Spinner size={30} color={'#04D7A4'} />
          </div>
        ) : null}
        <div className="mt-10 w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem] duration-500 mb-[-2rem]">
          <h1 className="font-extrabold text-[1.7rem] md:text-[2rem] xl:text-[2.5rem] text-black duration-500">
            Resultados para
            {goingTo ? (
              <>
                <span className="text-dark-black">: {` `}</span>
                <span className="text-dark-green">'{goingTo}'</span>
              </>
            ) : (
              <span>{` `} sua busca</span>
            )}
          </h1>
        </div>
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel, key) => {
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
          })
        ) : (
          <div className="flex flex-col mt-14 w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem] h-[40rem] justify-start items-center duration-500 md:bg-white py-20 rounded-3xl">
            <p className="text-center text-2xl font-medium text-grey">
              Nenhum hotel encontrado <br />
              com os filtros atuais.
            </p>
            <div className="relative mt-5 w-[18rem] h-[18rem] md:w-[25rem] md:h-[25rem] xl:w-[30rem] xl:h-[30rem] duration-500">
              <Image
                alt={'dont-find-hotel'}
                src={'/dont-find.png'}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        )}
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
