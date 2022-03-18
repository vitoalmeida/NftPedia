import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="flex fixed z-10 w-full drop-shadow-2xl bg-white h-16 items-center justify-center">
      <Image src="/logo.png" alt="logo" width="156" height="25" />
    </div>
  );
};

export default Header;
