import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';

const Home: React.FC = () => {
  const router = useRouter();

  const initialValues = {
    goingTo: 'Londres',
    travelers: 1,
    checkIn: '12',
    checkOut: '25',
  };

  function handleSearch(values) {
    router.push({
      pathname: '/searchHotel',
      query: {
        goingTo: values.goingTo,
        travelers: values.travelers,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
      },
    });
  }

  return (
    <div>
      <Head>
        <title>NextPedia</title>
      </Head>

      <Header />

      <main className="flex flex-col z-0 overflow-hidden">
        <div className="flex w-full h-[540px] flex-row mt-16 ">
          <div className="flex flex-col ml-auto px-6 mt-36">
            <text className="text-black font-extrabold text-4xl">Nos te</text>
            <text className="text-black font-extrabold text-4xl">
              ajudamos a
            </text>
            <text className="text-dark-green font-extrabold text-4xl">
              encontrar um
              <br /> hotel
            </text>
            <text className="text-black font-extrabold text-4xl">
              que seja sua
            </text>
            <text className="text-black font-extrabold text-4xl">cara</text>
          </div>
          <div className="flex w-1/2">
            {/* <Image
            className="absolute"
            src="/magnifier.png"
            width="500"
            height="500"
            layout="fixed"
          /> */}
          </div>
        </div>
        <div className="flex w-full">
          <Image src="/first-wave.png" width="2880" height="730" />
        </div>
        <div className="flex w-full h-[700px] px-10 bg-light-grey justify-center">
          <div className="flex flex-col w-full px-6 py-6 bg-white rounded-2xl">
            <Formik
              initialValues={initialValues}
              validate={values => {
                const errors = {};
                if (!values.goingTo) {
                  errors.goingTo = 'Required';
                }
                if (!values.travelers) {
                  errors.travelers = 'Required';
                }
                if (!values.checkIn) {
                  errors.checkIn = 'Required';
                }
                if (!values.checkOut) {
                  errors.checkOut = 'Required';
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-dark-green"
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <div className="flex w-full mt-[-300px]">
          <Image src="/second-wave.png" width="2875" height="387" />
        </div>
        <div className="flex w-full h-96 bg-greyish">
          <h1>Working</h1>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = () => ({
  props: {},
});
