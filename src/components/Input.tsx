// Libraries
import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { BiCoin, BiWallet } from 'react-icons/bi';

interface Props {
  name: string;
  placeholder: string;
  icon?: string;
  type?: string;
  required?: boolean;
  onChange: any;
  value: any;
  onBlur?: any;
  errors?: string;
}

const Input: React.FC<Props> = ({
  onChange,
  value,
  onBlur,
  name,
  placeholder,
  type = 'text',
  icon,
  required,
  errors,
}) => {
  let renderIcon;
  if (icon === 'wallet') {
    renderIcon = <BiWallet size="1.5rem" color="#999999" />;
  } else if (icon === 'coin') {
    renderIcon = <BiCoin size="1.5rem" color="#999999" />;
  } else {
    renderIcon = <IoCloseCircle size="1.5rem" color="#999999" />;
  }

  return (
    <div className="input-cantainer">
      <div id="icon" className="absolute px-3 py-2">
        {renderIcon}
      </div>
      <span className="absolute my-[0.7rem] ml-[2.7rem] h-5 w-[0.12rem] rounded-full bg-[#EAEAEA]" />
      <input
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur || undefined}
        required={required || (errors && errors.length > 0) || false}
      />
      <div id="errors" className="absolute mt-[-0.8rem] text-red text-sm">
        {errors}
      </div>
    </div>
  );
};

export default Input;
