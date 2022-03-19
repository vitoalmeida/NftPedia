// Libraries
import React from 'react';
import Image from 'next/image';
// Types
import { Hotel } from '../@types/general';
interface Props {
  hotel: Hotel;
}

const HotelCard: React.FC<Props> = ({ hotel }) => {
  return (
    <div
      id="container"
      className="flex relative w-[20rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem]  bg-white rounded-[1.2rem] mb-12"
    >
      <div className="w-32 h-28 md:w-40 md:h-40">
        <Image
          src={hotel.images[0]}
          className="rounded-tl-[1.2rem] rounded-bl-[1.2rem]"
          width="1230"
          quality="100"
          height="1080"
          layout={'responsive'}
        />
      </div>

      <div className=" absolute left-24 w-56 h-full bg-white rounded-[1.2rem]">
        <p>{hotel.name}</p>
      </div>

      <div id="price-container" className="flex absolute top-[-0.6rem] right-[-1rem] items-center justify-center">
        <div className="w-28 h-28 md:w-40 md:h-40">
          <Image
            src={'/price-vector.png'}
            width="700"
            height="800"
            layout={'responsive'}
          />
        </div>
        <p className="absolute">Test</p>
      </div>
    </div>
  );
};

export default HotelCard;
