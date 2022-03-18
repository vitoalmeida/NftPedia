import React from 'react';
import * as Icons from 'react-icons/hi';

interface Props {
  name: string;
  placeholder: string;
  icon: string;
  type?: string;
  onChange: any;
  value: any;
  onBlur: any;
}

const Input: React.FC<Props> = ({
  onChange,
  value,
  onBlur,
  name,
  placeholder,
  type = 'text',
  icon,
}) => {
  let renderIcon;
  if (icon === 'calendar') {
    renderIcon = <Icons.HiCalendar size="1.5em" color="#999999" />;
  } else if (icon === 'users') {
    renderIcon = <Icons.HiUsers size="1.5em" color="#999999" />;
  } else {
    renderIcon = <Icons.HiLocationMarker size="1.5em" color="#999999" />;
  }

  return (
    <div className="flex flex-row items-center mb-3 px-2 py-2 rounded-xl border border-solid border-[#DEDEDE]">
      {renderIcon}
      <input
        className="border-l-2 border-[#eaeaea] ml-[0.3rem] pl-[0.7rem]"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
