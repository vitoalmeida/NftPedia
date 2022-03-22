// Libraries
import React from 'react';
import * as Icons from 'react-icons/hi';

interface Props {
  name: string;
  placeholder: string;
  icon?: string;
  type?: string;
  required?: boolean;
  onChange: any;
  value: any;
  onBlur?: any;
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
}) => {
  let renderIcon;
  if (icon === 'calendar') {
    renderIcon = <Icons.HiCalendar size="1.5rem" color="#999999" />;
  } else if (icon === 'users') {
    renderIcon = <Icons.HiUsers size="1.5rem" color="#999999" />;
  } else {
    renderIcon = <Icons.HiLocationMarker size="1.5rem" color="#999999" />;
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
        required={required || false}
      />
    </div>
  );
};

export default Input;
