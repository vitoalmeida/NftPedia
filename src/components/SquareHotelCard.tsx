// Libraries
import React from 'react';
import Image from 'next/image';
import { IoStar, IoLocationSharp } from 'react-icons/io5';
// Types
import { Hotel } from '../@types/general';
interface Props {
  hotel: Hotel;
}

const SquareHotelCard: React.FC<Props> = ({ hotel }) => {
  return (
    <div
      id="container"
      className="flex relative shadow-xl h-[20rem] w-[20rem] bg-white rounded-[1.5rem] mt-12"
    >
      <div id="hotel-image" className="absolute w-[20rem]">
        <Image
          src={hotel.images[0]}
          className="rounded-[1.5rem]"
          width="1230"
          quality="100"
          height="1080"
          layout={'intrinsic'}
        />

        <div id="description-container" className="flex absolute bottom-0">
          <div id="card-wave" className="absolute bottom-[-2.2rem] w-[20rem]">
            <Image
              src={'/card-wave.png'}
              width="800"
              height="450
            "
              layout={'responsive'}
            />
            <div className="absolute w-full h-full pt-[4.5rem] bottom-0 px-6 overflow-hidden">
              <h1 className="ml-[0.15rem] text-2xl font-bold text-black overflow-hidden whitespace-nowrap text-ellipsis">
                {hotel.name}
              </h1>
              <div className="mt-[0.2rem]  flex items-center  flex-row">
                <IoLocationSharp size="1.3rem" color="#04D7A4" />
                <p className="text-sm ml-1 font-bold text-dark-grey">
                  {hotel.city}
                </p>
              </div>
              <div className="mt-1 flex items-center flex-row">
                <IoStar size="1.3rem" color="#F2D32F" />
                <p className="text-sm ml-1 font-bold text-dark-grey">
                  {hotel.stars}
                </p>
              </div>
              <h2 className="absolute right-6 bottom-6 text-black font-bold">
                R${hotel.price}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareHotelCard;
