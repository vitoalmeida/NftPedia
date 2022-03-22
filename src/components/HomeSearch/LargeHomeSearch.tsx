// Libraries
import React from 'react';
import { ptBR } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
// Components
import Input from '../Input';
import DateInput from '../DateInput';
import Button from '../Button';
// Types
import { FormikErrors, FormikTouched } from 'formik';
import { InitialValues } from '../../@types/general';

interface Props {
  handleChange: any;
  handleBlur: any;
  setFieldValue: any;
  values: InitialValues;
  errors: FormikErrors<InitialValues>;
  touched: FormikTouched<InitialValues>;
  isSubmitting: boolean;
}

const LargeHomeSearch: React.FC<Props> = ({
  handleChange,
  values,
  handleBlur,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
}) => {
  return (
    <div className="flex-col md:w-[40rem] lg:w-[60rem] 2xl:w-[80rem] mx-auto px-10 py-10 rounded-[4rem] rounded-tl-lg bg-white shadow-xl duration-500">
      <div className="flex flex-row items-center mt-2 justify-between">
        <div className="flex-col mr-6 w-full">
          <p className="filter-text">Indo para</p>
          <div>
            <Input
              name="goingTo"
              placeholder="Destino"
              type="text"
              icon="location"
              onChange={handleChange}
              value={values.goingTo}
              onBlur={handleBlur}
              required={errors.goingTo ? errors.goingTo?.length > 0 : false}
            />
          </div>
        </div>
        <div className="flex-col">
          <p className="filter-text">Viajantes</p>
          <div className="w-42">
            <Input
              name="travelers"
              placeholder="Viajantes"
              type="number"
              icon="users"
              onChange={handleChange}
              value={values.travelers}
              onBlur={handleBlur}
              required={errors.travelers ? errors.travelers?.length > 0 : false}
            />
          </div>
        </div>
      </div>
      <DateRangePicker
        startDate={values.checkIn || undefined}
        endDate={values.checkOut || undefined}
        onStartDateChange={value => setFieldValue('checkIn', value)}
        onEndDateChange={value => setFieldValue('checkOut', value)}
        minimumLength={1}
        minimumDate={new Date()}
        format="dd MMM yyyy"
        locale={ptBR}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="flex flex-row date-range justify-between">
            <div className="flex flex-col mr-3 w-full">
              <p className="filter-text">Check in</p>
              <DateInput
                focus={focus}
                dateInputProps={startDateInputProps}
                type="startDate"
                placeholder="Início"
                required={errors.checkIn ? errors.checkIn?.length > 0 : false}
              />
            </div>

            <div className="flex flex-col ml-3 w-full">
              <p className="filter-text">Check out</p>
              <DateInput
                focus={focus}
                dateInputProps={endDateInputProps}
                type="endDate"
                placeholder="Fim"
                required={errors.checkOut ? errors.checkOut?.length > 0 : false}
              />
            </div>
          </div>
        )}
      </DateRangePicker>

      <div className="mt-10 pb-4 bg-white rounded-br-[2rem] rounded-bl-[2rem] ">
        <Button text="BUSCAR" isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};
export default LargeHomeSearch;
