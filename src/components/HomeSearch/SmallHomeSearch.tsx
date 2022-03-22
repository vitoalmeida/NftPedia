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

const SmallHomeSearch: React.FC<Props> = ({
  handleChange,
  values,
  handleBlur,
  errors,
  touched,
  isSubmitting,
  setFieldValue,
}) => {
  return (
    <>
      <div className="pt-4 px-10 mx-10 bg-white rounded-tr-[2.5rem] rounded-tl-[0.5rem]">
        <p className="filter-text mt-2">Indo para</p>
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

        <p className="filter-text">Viajantes</p>
        <Input
          name="travelers"
          placeholder="Viajantes"
          type="text"
          icon="users"
          onChange={handleChange}
          value={values.travelers}
          onBlur={handleBlur}
          required={errors.travelers ? errors.travelers?.length > 0 : false}
        />
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
          <div className="flex flex-col date-range justify-between px-10 pt-6 pb-8 mx-10 bg-white">
            <div className="flex flex-col">
              <p className="filter-text">Check in</p>
              <DateInput
                focus={focus}
                dateInputProps={startDateInputProps}
                type="startDate"
                placeholder="Início"
                required={errors.checkIn ? errors.checkIn?.length > 0 : false}
              />
            </div>

            <div className="flex flex-col">
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
      <div className="px-10 pb-8 mx-10 bg-white rounded-br-[2rem] rounded-bl-[2rem] ">
        <Button text="BUSCAR" isSubmitting={isSubmitting} />
      </div>
    </>
  );
};
export default SmallHomeSearch;
