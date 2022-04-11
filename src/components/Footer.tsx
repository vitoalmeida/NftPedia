// Libraries
import React from 'react';
import Image from 'next/image';
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5';

const Footer: React.FC = () => {
  return (
    <div>
      <div id="second-wave" className="flex w-full mb-[-0.032rem] duration-500">
        <Image
          alt="third-wave-division"
          src="/third-wave.png"
          width="2560"
          height="380"
          priority
        />
      </div>
      <div
        id="footer"
        className="flex w-full pb-8 px-10 md:px-20 xl:px-32 h-20 bg-[#ECECEC] flex-row pt-6 justify-between items-center duration-500"
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
            <IoLogoLinkedin size="2.5rem" color="#04D7A4" />
          </a>
          <a
            target="_blank"
            href="https://github.com/vitoalmeida"
            className="h-10 w-10"
          >
            <IoLogoGithub size="2.5rem" color="#04D7A4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
