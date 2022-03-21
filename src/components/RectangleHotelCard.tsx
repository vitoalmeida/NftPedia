// Libraries
import React, { useState } from 'react';
import { IoClose, IoStar, IoLocationSharp } from 'react-icons/io5';
import Image from 'next/image';
import ReactModal from 'react-modal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Types
import { Hotel } from '../@types/general';

interface Props {
  hotel: Hotel;
}

const RectangleHotelCard: React.FC<Props> = ({ hotel }) => {
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
            {hotel.images.map(image => {
              return (
                <div className="relative w-[30rem] h-[30rem]">
                  <Image src={image} layout="fill" objectFit="cover" />
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
        className="flex ml-[-1rem] relative shadow-xl w-[30rem] md:w-[40rem] lg:w-[50rem] xl:w-[60rem]  bg-white rounded-[1.5rem] mt-12 duration-500"
        onClick={() => setModalOpen(true)}
      >
        <div className="w-32 md:w-40 lg:w-44">
          <Image
            src={hotel.images[0]}
            className="rounded-tl-[1.2rem] rounded-bl-[1.5rem]"
            width="1230"
            quality="100"
            height="1080"
            layout={'responsive'}
          />
        </div>

        <div
          id="description"
          className="absolute pl-12 md:pl-16 py-5 md:py-7 md:left-[7.5rem] lg:left-[8.6rem] md:w-96 lg:w-[33rem] xl:w-[42rem] h-full bg-white rounded-[1.5rem]"
        >
          <h1 className="text-2xl text-black font-bold  overflow-hidden whitespace-nowrap text-ellipsis">
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
        </div>

        <div
          id="price-container"
          className="flex absolute top-[-0.6rem] right-[-1rem] items-center justify-center"
        >
          <div className="w-28 h-28 md:w-40 md:h-40 lg:w-44">
            <Image
              src={'/price-vector.png'}
              width="800"
              height="800"
              layout={'responsive'}
              priority
            />
          </div>
          <p className="absolute text-xl ml-8 text-white font-bold">
            R$ {hotel.price}
          </p>
        </div>
      </div>
    </>
  );
};

export default RectangleHotelCard;
