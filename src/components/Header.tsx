// Libraries
import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';

// Components
import Input from './Input';

interface InitialValues {
  goingTo?: string;
  travelers?: number;
  checkIn?: string;
  checkOut?: string;
}

interface InitialValuesError {
  goingTo?: string;
  travelers?: string;
  checkIn?: string;
  checkOut?: string;
}

const Header: React.FC = () => {
  // Filter states
  const [filterIsOpen, setFilterOpen] = useState(false);

  const initialValues: InitialValues = {
    goingTo: '',
    travelers: undefined,
    checkIn: '',
    checkOut: '',
  };

  return (
    <>
      <div className="flex fixed z-20 w-full drop-shadow-2xl bg-white h-20 md:h-16 items-center justify-center md:justify-between md:px-24 xl:px-44 2xl:px-60 duration-500">
        <div className="w-44 md:w-36">
          <Image src="/logo.png" alt="logo" width="270" height="44" />
        </div>
        <span
          className="absolute right-10 md:relative md:right-0"
          onClick={() => setFilterOpen(!filterIsOpen)}
        >
          {filterIsOpen ? (
            <FaTimes size={'2rem'} color="#04D7A4" />
          ) : (
            <FaSearch size={'2rem'} color="#04D7A4" />
          )}
        </span>
      </div>
      <div
        id="filter-modal"
        className={filterIsOpen ? 'filter-menu-opened' : 'filter-menu'}
      >
        <div id="filter-conteinter" className="flex flex-col w-full px-14 py-10">
          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors: InitialValuesError = {};
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
                <h1 className="text-[2.5rem] text-black font-bold">Filtros</h1>
                <p className="text-[1.4rem] font-bold text-dark-grey">
                  Indo para
                </p>
                <Input
                  onChange={handleChange}
                  value={values.goingTo}
                  onBlur={handleBlur}
                  type="text"
                  name="goingTo"
                  placeholder="Ex: Salvador"
                />
                <p className="text-[1.4rem] font-bold text-dark-grey">
                  Viajantes
                </p>
                <Input
                  onChange={handleChange}
                  value={values.travelers}
                  onBlur={handleBlur}
                  type="text"
                  name="travelers"
                  placeholder="Ex: 1"
                />
                <p className="text-[1.4rem] font-bold text-dark-grey">
                  Check in
                </p>
                <p className="text-[1.4rem] font-bold text-dark-grey">
                  Chek out
                </p>
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
    </>
  );
};

export default Header;
