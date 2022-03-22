// Libraries
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes, FaSearch, FaSlidersH } from 'react-icons/fa';
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
        <a href="/" className="w-44 md:w-36 hover:scale-110 duration-300">
          <Image alt="NextPedia-logo" src="/logo.png" width="714" height="114" quality={100} priority />
        </a>
        <span className="absolute right-6 md:relative md:right-0 cursor-pointer hover:scale-110 duration-300">
          {router.pathname === '/' ? (
            <Link href="#first-wave">
              <FaSearch size={'2rem'} color="#04D7A4" />
            </Link>
          ) : (
            <div onClick={() => setFilterOpen(!filterIsOpen)}>
              {filterIsOpen ? (
                <FaTimes size={'2rem'} color="#04D7A4" />
              ) : (
                <FaSlidersH size={'2rem'} color="#04D7A4" />
              )}
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
