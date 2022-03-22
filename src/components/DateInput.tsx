// Libraries
import React from 'react';
import { HiCalendar } from 'react-icons/hi';
import { DateRangeFocus, InputProps } from 'react-nice-dates';

interface Props {
  dateInputProps: InputProps;
  focus: DateRangeFocus;
  type: string;
  placeholder: string;
  required?: boolean;
}

const DateInput: React.FC<Props> = ({
  dateInputProps,
  focus,
  type,
  placeholder,
  required,
}) => {
  return (
    <div className="input-cantainer">
      <div id="icon" className="absolute px-3 py-2">
        <HiCalendar size="1.5rem" color="#999999" />
      </div>
      <span className="absolute my-[0.7rem] ml-[2.7rem] h-5 w-[0.12rem] rounded-full bg-[#EAEAEA]" />
      <input
        className={
          'border-[#DEDEDE] pl-14 border-[0.1rem] rounded-xl px-2 py-2 w-full duration-500 required:border-red' +
          (focus === type ? ' -focused border-[#00ACB0] outline-none' : '')
        }
        {...dateInputProps}
        placeholder={placeholder}
        required={required || false}
      />
    </div>
  );
};

export default DateInput;
