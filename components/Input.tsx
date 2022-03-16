import React from 'react';

interface Props {
  name: string;
  placeholder: string;
  type?: string;
}

const Input: React.FC<Props> = ({ name, placeholder, type = 'text' }) => {
  return (
    <div className="flex mb-3 px-2 py-2 rounded-xl border border-solid border-[#DEDEDE]">
      <input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default Input;
