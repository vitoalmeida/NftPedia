// Libraries
import React from 'react';
import { ptBR } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
// Components
import Input from './Input';
import DateInput from './DateInput';
import Button from './Button';
// Types
import { FormikErrors, FormikTouched } from 'formik';
import { InitialValues } from '../@types/general';

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
  console.log(errors.nftAddress)
  return (
    <div className="flex-col py-8 pb-10 px-10 mx-10 md:w-[40rem] lg:w-[60rem] 2xl:w-[80rem] md:mx-auto md:py-10 rounded-[4rem] rounded-tl-lg bg-white shadow-xl duration-500">
      <p className="filter-text">Endereço da carteira</p>
      <Input
        name="walletAddress"
        placeholder="Ex.: 0x8f...b3ba"
        type="text"
        icon="wallet"
        onChange={handleChange}
        value={values.walletAddress}
        onBlur={handleBlur}
        errors={errors.walletAddress ? errors.walletAddress : undefined}
        required={
          errors.walletAddress ? errors.walletAddress?.length > 0 : false
        }
        />

      <p className="filter-text mt-2">Endereço do NFT (Opcional)</p>
      <Input
        name="nftAddress"
        placeholder="Ex.: 0x9c...3f5e"
        type="text"
        icon="coin"
        onChange={handleChange}
        value={values.nftAddress}
        errors={errors.nftAddress ? errors.nftAddress : undefined}
        onBlur={handleBlur}
      />
      <div className="my-6">
        <Button text="BUSCAR" isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};
export default LargeHomeSearch;
