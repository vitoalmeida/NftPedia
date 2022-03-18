import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';
import { getHotels } from '../services/api.ts';

const SearchHotel: React.FC = ({ hotelList }) => {
  const router = useRouter();
  getHotels();

  const { goingTo, travelers, checkIn, checkOut } = router.query;

  return (
    <div>
      <h1>teste</h1>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      hotelList: 'data',
    },
  };
}

export default SearchHotel;
