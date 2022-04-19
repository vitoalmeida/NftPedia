// Libraries
import React, { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
// Reducer
import { reducerHotel, initialState } from '../store/hotels';
// Components
import Header from '../components/Header';
import Footer from '../components/Footer';
import LargeHomeSearch from '../components/HomeSearch';
// Types
import { InitialValues, InitialValuesError } from '../@types/general';

const Home: React.FC = () => {
  // Reducer
  const [hotelState, dispatch] = useReducer(reducerHotel, initialState);
  const { loadingHotels } = hotelState;

  // Router
  const router = useRouter();

  // Initial form values
  const initialValues: InitialValues = {
    walletAddress: undefined,
    nftAddress: undefined,
  };

  function handleSearch(values: InitialValues) {
    dispatch({ type: 'FILTER_HOTELS' });

    router.push({
      pathname: '/searchNFTs',
      query: {
        walletAddress: values.walletAddress,
        nftAddress: values.nftAddress,
      },
    });
  }

  return (
    <div>
      <Head>
        <title>NFTsPedia</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Search and Find the best hotels for you"
        />
        <meta name="keywords" content="Hotels, Search, Booking" />
        <meta name="author" content="Vitor Machado" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />

      <main id="main" className="flex flex-col z-0">
        <div
          id="home"
          className="relative overflow-hidden w-full h-[28rem] md:h-[40rem] duration-500 flex-row mt-[-1rem] md:mt-2"
        >
          <div className="flex duration-500 flex-col ml-5 md:ml-24 lg:ml-36 xl:ml-48 2xl:ml-60 px-6 mt-36">
            <p className="home-title">
              Nós te
              <br />
              ajudamos a
            </p>
            <span className="home-title text-dark-green">
              encontrar um <br />
              NFT
            </span>
            <p className="home-title">
              que seja a sua
              <br />
              cara
            </p>
          </div>

          <div className="absolute duration-500 right-[-13.5rem] top-[2rem] w-[25rem] h-[25rem] md:top-[-5rem] md:right-[-18rem] md:w-[45rem] md:h-[45rem] lg:right-[-18rem] lg:top-[-15rem] lg:w-[60rem] lg:h-[60rem]">
            <Image alt="magnifier" src="/magnifier.png" layout="fill" />
          </div>
        </div>
        <div id="first-wave" className="flex w-full">
          <Image
            alt="first-wave-division"
            src="/first-wave.png"
            width="2560"
            height="621"
            priority
          />
        </div>

        <div
          id="about-us"
          className="relative flex flex-col md:pb-56 lg:pb-72 2xl:pb-96 md:py-44 lg:py-56 2xl:py-72 w-full h-full pb-24 bg-[#FAFAFA] md:justify-start items-center md:items-start mt-[-0.2rem] duration-500"
        >
          <div className="relative md:absolute duration-500 md:left-[-11rem] lg:left-[-15rem] 2xl:left-[-13rem] top-[2rem] w-[22rem] h-[16rem] md:w-[44rem] md:h-[30rem] lg:w-[60rem] lg:h-[40rem] 2xl:w-[65rem] 2xl:h-[45rem]">
            <Image alt="about-us" src="/about-us.jpg" layout="fill" />
          </div>
          <div
            id="about-us-text"
            className="z-10 flex flex-col duration-500 md:ml-auto md:mr-2 lg:mr-8 xl:mr-48 2xl:mr-60 px-8 md:px-6 mt-10 md:mt-0 "
          >
            <h1 className="font-bold text-3xl lg:text-[3rem] text-black text-center duration-500 2xl:mt-[-5rem]">
              Sobre nós
            </h1>
            <p className="mt-2 lg:mt-5 font-semibold text-[1.2rem] lg:text-[1.5rem] 2xl:text-[2rem] text-[#454545] text-center duration-500">
              Temos mais de <span className="text-dark-green">200 hoteis</span>
              <br /> e mais de <span className="text-dark-green">5 anos</span>
              <br /> de participação de mercado <br /> <br /> Garantimos um
              hotel com a sua cara
              <br /> ou seu dinheiro de volta
            </p>
          </div>
        </div>

        <div id="second-wave" className="flex w-full bg-[#FAFAFA]">
          <Image
            alt="second-wave-division"
            src="/second-wave.png"
            width="2560"
            height="364"
            quality={100}
            priority
          />
        </div>
        <div
          id="search-hotel"
          className="w-full h-[40rem] bg-[#F4F4F4] justify-center mt-[-0.2rem]"
        >
          <h1 className="font-bold text-4xl text-black mx-10 mt-32 md:w-[40rem] lg:w-[60rem] 2xl:w-[80rem] md:mx-auto duration-500">
            Exploração
          </h1>
          <div className="flex flex-col w-full py-4">
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validate={values => {
                const errors: InitialValuesError = {};
                if (!values.walletAddress) {
                  errors.walletAddress = 'Preencha este campo';
                } else if (values.walletAddress?.length != 42) {
                  errors.walletAddress = 'Endereço incorreto';
                }
                if (values.nftAddress && values.nftAddress?.length != 42) {
                  errors.nftAddress = 'Endereço incorreto';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  handleSearch(values);
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <LargeHomeSearch
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    isSubmitting={loadingHotels}
                    setFieldValue={setFieldValue}
                  />
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-[#F4F4F4] pt-30">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
