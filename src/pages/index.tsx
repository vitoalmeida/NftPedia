import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';

import { ptBR } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Input from '../components/Input';
import Footer from '../components/Footer';

interface InitialValues {
  goingTo: string;
  travelers: number;
  checkIn: string;
  checkOut: string;
}

interface InitialValuesError {
  goingTo?: string;
  travelers?: string;
  checkIn?: string;
  checkOut?: string;
}

const Home: React.FC = () => {
  const router = useRouter();

  const initialValues: InitialValues = {
    goingTo: 'Ac',
    travelers: 1,
    checkIn: '',
    checkOut: '',
  };

  // Date-picker states
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  function handleSearch(values: InitialValues) {
    router.push({
      pathname: '/searchHotel',
      query: {
        goingTo: values.goingTo,
        travelers: values.travelers,
        checkIn: startDate ? startDate.toISOString() : undefined,
        checkOut: endDate ? endDate.toISOString() : undefined,
      },
    });
  }

  return (
    <div>
      <Head>
        <title>NextPedia</title>
      </Head>

      <Header />

      <main id="main" className="flex flex-col z-0">
        <div
          id="home"
          className="relative overflow-hidden w-full h-[28rem] md:h-[40rem] duration-500 flex-row mt-[-1rem] md:mt-2"
        >
          <div className="flex duration-500 flex-col ml-8 md:ml-24 lg:ml-36 xl:ml-48 px-6 mt-36">
            <p className="home-title">
              Nós te
              <br />
              ajudamos a
            </p>
            <span className="home-title text-dark-green">
              encontrar um <br />
              hotel
            </span>
            <p className="home-title">
              que seja a sua
              <br />
              cara
            </p>
          </div>

          <div className="absolute duration-500 right-[-12rem] top-[2rem] w-[25rem] h-[25rem] md:top-[-5rem] md:w-[45rem] md:h-[45rem] lg:right-[-15rem] lg:top-[-15rem] lg:w-[60rem] lg:h-[60rem]">
            <Image src="/magnifier.png" layout="fill" />
          </div>
        </div>
        <div id="first-wave" className="flex w-full">
          <Image src="/first-wave.png" width="2880" height="730" />
        </div>

        <div
          id="search-hotel"
          className="w-full h-[35rem] bg-light-grey justify-center"
        >
          <h1 className="font-bold text-4xl text-black mx-10 mb-[-1.2rem] mt-12">
            Buscar Hoteis
          </h1>
          <div className="flexflex-col w-full py-8">
            <Formik
              initialValues={initialValues}
              validate={values => {
                const errors: InitialValuesError = {};
                // if (!values.goingTo) {
                //   errors.goingTo = 'Required';
                // }
                // if (!values.travelers) {
                //   errors.travelers = 'Required';
                // }
                // if (!values.checkIn) {
                //   errors.checkIn = 'Required';
                // }
                // if (!values.checkOut) {
                //   errors.checkOut = 'Required';
                // }

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
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="pt-4 px-10 mx-10 bg-white rounded-tr-[2rem] rounded-tl-[2rem]">
                    <p className="filter-text mt-2">Indo para</p>
                    <Input
                      name="goingTo"
                      placeholder="Going to"
                      type="text"
                      icon="location"
                      onChange={handleChange}
                      value={values.goingTo}
                      onBlur={handleBlur}
                    />
                    {errors.goingTo && touched.goingTo && errors.goingTo}

                    <p className="filter-text">Viajantes</p>
                    <Input
                      name="travelers"
                      placeholder="Travelers Count"
                      type="text"
                      icon="users"
                      onChange={handleChange}
                      value={values.travelers}
                      onBlur={handleBlur}
                    />
                    {errors.travelers && touched.travelers && errors.travelers}
                  </div>

                  <DateRangePicker
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    minimumLength={1}
                    minimumDate={new Date()}
                    format="dd MMM yyyy"
                    locale={ptBR}
                  >
                    {({ startDateInputProps, endDateInputProps, focus }) => (
                      <div className="flex flex-row date-range justify-between px-10 pb-8 mx-10 bg-white">
                        <div className="flex flex-col">
                          <p className="filter-text">Check in</p>
                          <input
                            className={
                              'border-[#DEDEDE] border-[0.1rem] rounded-xl px-3 py-2  w-[7.5rem] lg:w-52 duration-500' +
                              (focus === 'startDate' ? ' -focused' : '')
                            }
                            {...startDateInputProps}
                            placeholder="Início"
                          />
                        </div>

                        <div className="flex flex-col">
                          <p className="filter-text">Check in</p>
                          <input
                            className={
                              'border-[#DEDEDE] border-[0.1rem] rounded-xl px-2 py-2 w-[7.5rem] lg:w-52 duration-500' +
                              (focus === 'endDate' ? ' -focused' : '')
                            }
                            {...endDateInputProps}
                            placeholder="Fim"
                          />
                        </div>
                      </div>
                    )}
                  </DateRangePicker>

                  <div className="px-10 pb-8 mx-10 bg-white rounded-br-[2rem] rounded-bl-[2rem]">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 rounded-2xl bg-dark-green text-xl text-white font-bold border-[#00b587] border-b-[0.4rem]"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-light-grey pt-20">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
