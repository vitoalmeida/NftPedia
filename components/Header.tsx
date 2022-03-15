import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="flex w-full drop-shadow-2xl bg-white h-20 items-center justify-center md:h-16">
      <Image src="/logo.png" alt="logo" width="156" height="25" />
    </div>
  );
};

export default Header;
