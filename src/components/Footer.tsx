// Libraries
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaSearch } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div>
      <div id="second-wave" className="flex w-full mb-[-0.032rem] duration-500">
        <Image src="/second-wave.png" width="2875" height="387" />
      </div>
      <div
        id="footer"
        className="flex w-full pb-8 px-10 md:px-20 xl:px-32 h-20 bg-greyish flex-row pt-6 justify-between items-center duration-500"
      >
        <p className="font-medium text-black">
          Worked by&nbsp;
          <span className="text-dark-green">Vitor Machado</span>
        </p>
        <div className="w-[5.5rem] flex flex-row justify-between">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/vitormachado-work/"
            className="h-10 w-10"
          >
            <Image src="/github.png" width="250" height="250" />
          </a>
          <a
            target="_blank"
            href="https://github.com/vitoalmeida"
            className="h-10 w-10"
          >
            <Image src="/linkedin.png" width="250" height="250" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
