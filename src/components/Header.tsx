// Libraries
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
//Icons
import { FaTimes, FaSearch, FaSlidersH } from 'react-icons/fa';
import { IoHammer } from 'react-icons/io5';
import { TiHome } from 'react-icons/ti';
// Components
import SmallFilters from './Filters/SmallFilters';
import LargeFilters from './Filters/LargeFilters';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  // Route params
  const router = useRouter();
  const { goingTo, travelers, checkIn, checkOut, stars, price } = router.query;

  // Filter states
  const [filterIsOpen, setFilterOpen] = useState(false);

  // Window width state
  const [isMobile, setMobile] = useState<boolean>();

  // Function to get screen type
  const updateMedia = () => {
    setMobile(window.innerWidth < 770);
  };

  // Function close filter
  function closeFilter() {
    setFilterOpen(false);
  }

  useEffect(() => {
    setMobile(window.innerWidth < 770);
    window.addEventListener('resize', updateMedia, { passive: true });
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <>
      <div className="flex fixed z-20 w-full drop-shadow-2xl bg-white h-20 md:h-16 items-center justify-center md:justify-between md:px-24 xl:px-44 2xl:px-60 duration-500">
        <Link href="/">
          <div className="w-44 md:w-36 hover:scale-110 duration-300 cursor-pointer">
            <Image
              alt="NFTsPedia-logo"
              src="/logo.svg"
              width="714"
              height="114"
              quality={100}
              priority
            />
          </div>
        </Link>
        <span className="absolute right-6 md:relative md:right-0 cursor-pointer">
          {isMobile ? (
            <div className="flex">
              <Link href="/">
                <TiHome className="mr-[0.9rem]" size={'1.7rem'} color="#000" />
              </Link>
              <Link href="/minter">
                <IoHammer
                  className="mr-[0.9rem]"
                  size={'1.7rem'}
                  color="#000"
                />
              </Link>
              <Link href="#second-wave">
                <FaSearch size={'1.5rem'} color="#000" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-row">
              <Link href="/">
                <div className="flex flex-row items-center mr-7 hover:scale-105 duration-300">
                  <TiHome
                    className="mr-[0.4rem]"
                    size={'1.7rem'}
                    color="#000"
                  />
                  <a className="font-medium text-[1.4rem]">Home</a>
                </div>
              </Link>
              <Link href="/minter">
                <div className="flex flex-row items-center mr-7 hover:scale-105 duration-300">
                  <IoHammer
                    className="mr-[0.4rem]"
                    size={'1.7rem'}
                    color="#000"
                  />
                  <a className="font-medium text-[1.4rem]">Minter</a>
                </div>
              </Link>
              <Link href="/#second-wave">
                <div className="flex flex-row items-center hover:scale-105 duration-300">
                  <FaSearch
                    className="mr-[0.4rem]"
                    size={'1.5rem'}
                    color="#000"
                  />
                  <a className="font-medium text-[1.4rem]">Explorer</a>
                </div>
              </Link>
            </div>
          )}
        </span>
      </div>

      <div
        id="filter-modal"
        className={filterIsOpen ? 'filter-menu-opened' : 'filter-menu'}
      >
        {isMobile ? (
          <SmallFilters
            filterValues={{
              goingTo,
              travelers,
              checkIn,
              checkOut,
              stars,
              price,
            }}
            closeFilter={closeFilter}
          />
        ) : (
          <LargeFilters
            filterValues={{
              goingTo,
              travelers,
              checkIn,
              checkOut,
              stars,
              price,
            }}
            closeFilter={closeFilter}
          />
        )}
      </div>
    </>
  );
};

export default Header;
