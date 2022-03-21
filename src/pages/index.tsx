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
          className="flex w-full h-[540px] duration-500 flex-row mt-[-1rem] md:mt-2"
        >
          <div className="flex duration-500 flex-col ml-8 md:ml-24 lg:ml-36 xl:ml-48 px-6 mt-36">
            <p className="text-black font-extrabold text-3xl md:text-5xl xl:text-6xl">
              Nós te
            </p>
            <p className="text-black font-extrabold text-3xl md:text-5xl xl:text-6xl">
              ajudamos a
            </p>
            <p className="text-dark-green font-extrabold text-3xl md:text-5xl xl:text-6xl">
              encontrar um
              <br /> hotel
            </p>
            <p className="text-black font-extrabold text-3xl md:text-5xl xl:text-6xl">
              que seja a sua
            </p>
            <p className="text-black font-extrabold text-3xl md:text-5xl xl:text-6xl">
              cara
            </p>
          </div>
          <div className="absolute duration-500 right-[-12rem] top-[-0rem] w-[30rem] h-[30rem] md:right-[-15rem] md:top-[-5rem] md:w-[45rem] md:h-[45rem] lg:right-[-15rem] lg:top-[-15rem] lg:w-[60rem] lg:h-[60rem]">
            <Image
              src="/magnifier.png"
              layout="fill"
            />
          </div>
        </div>
        <div id="first-wave" className="flex w-full">
          <Image src="/first-wave.png" width="2880" height="730" />
        </div>
        <div
          id="search-hotel"
          className="w-full h-[800px] px-10 bg-light-grey justify-center"
        >
          <h1 className="font-bold text-3xl text-black mb-[0.8rem] mt-8">
            Search Hotels
          </h1>
          <div className="flex-col w-full px-8 py-8 bg-white rounded-[2rem] ">
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
                  {errors.goingTo && touched.goingTo && errors.goingTo}
                  <Input
                    name="goingTo"
                    placeholder="Going to"
                    type="text"
                    icon="location"
                    onChange={handleChange}
                    value={values.goingTo}
                    onBlur={handleBlur}
                  />

                  {errors.travelers && touched.travelers && errors.travelers}
                  <Input
                    name="travelers"
                    placeholder="Travelers Count"
                    type="text"
                    icon="users"
                    onChange={handleChange}
                    value={values.travelers}
                    onBlur={handleBlur}
                  />

                  {errors.checkIn && touched.checkIn && errors.checkIn}
                  <Input
                    name="checkIn"
                    placeholder="Check in"
                    type="text"
                    icon="calendar"
                    onChange={handleChange}
                    value={values.checkIn}
                    onBlur={handleBlur}
                  />
                  {errors.checkOut && touched.checkOut && errors.checkOut}
                  <Input
                    name="checkOut"
                    placeholder="Check out"
                    type="text"
                    icon="calendar"
                    onChange={handleChange}
                    value={values.checkOut}
                    onBlur={handleBlur}
                  />

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
                      <div className="flex flex-row date-range justify-between">
                        <div className="flex flex-col">
                          <p className="filter-text">Check in</p>
                          <input
                            className={
                              'border-[#DEDEDE] border-[0.1rem] rounded-xl px-3 py-2 w-40 lg:w-52 duration-500' +
                              (focus === 'startDate' ? ' -focused' : '')
                            }
                            {...startDateInputProps}
                            placeholder="Início"
                          />
                        </div>

                        <div className="flex flex-col">
                          <p className="filter-text">Check</p>
                          <input
                            className={
                              'border-[#DEDEDE] border-[0.1rem] rounded-xl px-3 py-2 w-40 lg:w-52 duration-500' +
                              (focus === 'endDate' ? ' -focused' : '')
                            }
                            {...endDateInputProps}
                            placeholder="Fim"
                          />
                        </div>
                      </div>
                    )}
                  </DateRangePicker>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-dark-green text-xl text-white font-bold border-[#00b587] border-b-[0.4rem]"
                  >
                    SUBMIT
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="bg-light-grey">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
