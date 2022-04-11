// Libraries
import React, { useState } from 'react';
import { IoClose, IoStar, IoLocationSharp } from 'react-icons/io5';
import Image from 'next/image';
import ReactModal from 'react-modal';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Types
import { NFT } from '../../@types/general';

interface Props {
  NFT: NFT;
}

const RectangleNFTCard: React.FC<Props> = ({ NFT }) => {
  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);

  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      <ReactModal
        className="modal"
        overlayClassName="modal-overlay"
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      >
        <div className="flex flex-col w-[35rem] xl:w-[45rem] duration-500">
          <div className="relative overflow-hidden w-full h-[30rem] rounded-3xl duration-500">
            <div
              className="z-20 absolute top-5 right-5 "
              onClick={handleCloseModal}
            >
              <IoClose size="2rem" color="#FFF" />
            </div>
            {/* <Carousel emulateTouch autoPlay showStatus={false}>
              {NFT.images.map((image, index) => {
                return (
                  <div key={index} className="relative w-full h-[30rem]">
                    <Image
                      alt={`${NFT.name}-image`}
                      src={image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                );
              })}
            </Carousel> */}
          </div>

          <div className="my-5 mb-8 px-12 w-full">
            <h1 className="text-black font-bold text-[1.8rem] w-[24rem] h-auto break-words">
              {NFT.title}
            </h1>
            <div className="flex mt-[0.2rem] items-center flex-row ml-[-0.2rem]">
              <IoLocationSharp size="2rem" color="#FF4A4A" />
              {/* <p className="text-lg ml-2 font-bold text-dark-grey mr-8">
                {NFT.city}
              </p> */}
              <IoStar size="2rem" color="#F2D32F" />
              {/* <p className="text-lg ml-2 font-bold text-dark-grey">
                {NFT.stars}
              </p> */}
            </div>
            <span className="flex my-4 h-[0.4rem] w-full bg-light-grey rounded-full" />

            <div className="ml-[-0.2rem] flex flex-col w-full h-[5.5rem] overflow-y-scroll overflow-x-hidden">
              <p className="text-lg ml-2 font-medium text-black mr-8">
                Sobre {NFT.title}
              </p>
              <p className="text-lg ml-2 w-full text-dark-grey mr-8 h-auto break-words">
                {NFT.description}
              </p>
            </div>
            <div className="flex w-full mt-8">
              {/* <p className="ml-auto font-medium text-2xl text-dark-green h-auto break-words">
                R$ {NFT.price}
              </p> */}
            </div>
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
            alt={`${NFT.image}-image`}
            src={ `https://res.cloudinary.com/demo/image/fetch/${NFT.image}` || ''}
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
            {NFT.title}
          </h1>
          <div className="mt-[0.2rem]  flex items-center  flex-row">
            <IoLocationSharp size="1.3rem" color="#04D7A4" />
            {/* <p className="text-sm ml-1 font-bold text-dark-grey">
              {NFT.city}
            </p> */}
          </div>
          <div className="mt-1 flex items-center flex-row">
            <IoStar size="1.3rem" color="#F2D32F" />
            {/* <p className="text-sm ml-1 font-bold text-dark-grey">
              {NFT.stars}
            </p> */}
          </div>
        </div>

        <div
          id="price-container"
          className="flex absolute top-[-0.6rem] right-[-1rem] items-center justify-center"
        >
          <div className="w-28 h-28 md:w-40 md:h-40 lg:w-44">
            <Image
              alt="price-cantainer"
              src={'/price-vector.png'}
              width="800"
              height="800"
              layout={'responsive'}
              priority
            />
          </div>
          {/* <p className="absolute text-xl ml-8 text-white font-bold">
            R$ {NFT.price}
          </p> */}
        </div>
      </div>
    </>
  );
};

export default RectangleNFTCard;
