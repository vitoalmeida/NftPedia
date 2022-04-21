// Libraries
import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';
// API
import { fetchNFTs } from '../services/api';
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
import { NFT } from '../@types/general';

interface Props {
  NFTsList: any;
}

const SearchNFTs: React.FC<Props> = ({ NFTsList }) => {
  // Reducer
  const [hotelState, dispatch] = useReducer(reducerHotel, initialState);
  const { loadingHotels } = hotelState;

  // Route params
  const router = useRouter();
  const { walletAddress, nftAddress } = router.query;
  console.log('query', walletAddress, nftAddress);

  // useEffect(() => {
  //   setFilteredHotels(
  //     generalHelpers.filterHotels(
  //       {
  //         goingTo: goingTo,
  //         travelers: travelers,
  //         checkIn: checkIn,
  //         checkOut: checkOut,
  //         stars: stars,
  //         price: price,
  //       },
  //       hotelList
  //     )
  //   );
  //   dispatch({ type: 'FILTER_HOTELS_SUCCESS' });
  // }, [router]);

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
    <div className="relative h-full bg-[#F4F4F4]">
      <Head>
        <title>Search - NFTsPedia</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Search results" />
        <meta name="keywords" content="NFTs, Search" />
        <meta name="author" content="Vitor Machado" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      <main className="flex flex-col px-[3rem] md:px-[6rem] xl:px-[11rem] 2xl:px-[15rem] pt-20 md:pt-16 pb-20  w-full h-full duration-500">
        {loadingHotels ? (
          <div className="flex justify-center mt-10 duration-500">
            <Spinner size={30} color={'#04D7A4'} />
          </div>
        ) : null}
        <div className="mt-10 w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem] duration-500 mb-[-2rem]">
          <h1 className="font-extrabold text-[1.7rem] md:text-[2rem] xl:text-[2.5rem] text-black duration-500">
            Carteira:
            {/* {goingTo ? (
              <>
              <span className="text-dark-black">: {` `}</span>
              <span className="text-dark-green">'{goingTo}'</span>
              </>
              ) : (
                <span>{` `} sua busca</span>
              )} */}
          </h1>
          <span className="text-xl font-medium">{walletAddress}</span>
        </div>
        <div data-cy="nft-list" className="flex flex-row flex-wrap justify-between">
          {NFTsList?.length > 0 ? (
            NFTsList.map((NFT, key) => {
              if (isMobile) {
                return (
                  <div key={key}>
                    <SquareHotelCard NFT={NFT.value} />
                  </div>
                );
              } else {
                return (
                  <div key={key} className="ml-2">
                    <RectangleHotelCard NFT={NFT.value} />
                  </div>
                );
              }
            })
          ) : (
            <div className="flex flex-col mt-14 w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem] h-[40rem] justify-start items-center duration-500 md:bg-gradient-to-b from-white to-[#F4F4F4] py-20 rounded-3xl">
              <p className="text-center text-2xl font-medium text-grey">
                Nenhum NFT encontrado!
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
        </div>
      </main>
      <div className="bg-[#F4F4F4] pt-10">
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { walletAddress, nftAddress } = context.query;
  const NFTsList = (await fetchNFTs(walletAddress, nftAddress)) || null;

  return {
    props: {
      NFTsList,
    },
  };
}

export default SearchNFTs;
