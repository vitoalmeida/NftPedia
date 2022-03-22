// Libraries
import React, { useState } from 'react';
import Image from 'next/image';
import { IoClose, IoStar, IoLocationSharp } from 'react-icons/io5';
import ReactModal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Types
import { Hotel } from '../../@types/general';

interface Props {
  hotel: Hotel;
}

const SquareHotelCard: React.FC<Props> = ({ hotel }) => {
  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={isModalOpen}
      >
        <div className="relative overflow-hidden w-[30rem] h-[30rem] rounded-3xl">
          <div
            className="z-20 absolute top-5 right-5 "
            onClick={() => setModalOpen(false)}
          >
            <IoClose size="2rem" color="#FFF" />
          </div>
          <Carousel emulateTouch autoPlay showStatus={false}>
            {hotel.images.map((image, index) => {
              return (
                <div key={index} className="relative w-[30rem] h-[30rem]">
                  <Image
                    alt={`${hotel.name}-image`}
                    src={image}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="my-5 mb-8 mx-12">
          <h1 className="text-black font-bold text-[1.8rem]">{hotel.name}</h1>
          <div className="flex mt-[0.2rem] items-center flex-row ml-[-0.2rem]">
            <IoLocationSharp size="2rem" color="#FF4A4A" />
            <p className="text-lg ml-2 font-bold text-dark-grey mr-8">
              {hotel.city}
            </p>
            <IoStar size="2rem" color="#F2D32F" />
            <p className="text-lg ml-2 font-bold text-dark-grey">
              {hotel.stars}
            </p>
          </div>
        </div>
      </ReactModal>

      <div
        id="container"
        className="flex relative shadow-xl h-[20rem] w-[20rem] bg-white rounded-[1.5rem] mt-12"
        onClick={() => setModalOpen(true)}
      >
        <div id="hotel-image" className="absolute w-[20rem]">
          <Image
            alt="price-cantainer"
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
                alt="card-wave"
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
    </>
  );
};

export default SquareHotelCard;
