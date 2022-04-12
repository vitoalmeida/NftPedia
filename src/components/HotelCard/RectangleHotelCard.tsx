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

  const [isImageError, setImageError] = useState(false);

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
            {/* <div className="w-[35rem] xl:w-[45rem] duration-500"> */}
              <Image
                alt={`${NFT.image}-image`}
                src={
                  isImageError
                    ? '/not-found.png'
                    : `https://res.cloudinary.com/demo/image/fetch/${NFT.image}` ||
                      ''
                }
                className="rounded-[1.5rem] duration-500"
                onError={() => setImageError(true)}
                width="1230"
                quality="100"
                height="1230"
                layout={'responsive'}
              />
            {/* </div> */}
          </div>

          <div className="my-5 mb-8 px-12 w-full">
            <h1 className="text-black font-bold text-[1.8rem] w-[24rem] h-auto break-words">
              {NFT.title}
            </h1>
            <div className="flex mt-[0.2rem] items-center flex-row ml-[-0.2rem]">
              {/* <IoLocationSharp size="2rem" color="#FF4A4A" /> */}
              {/* <p className="text-lg ml-2 font-bold text-dark-grey mr-8">
                {NFT.city}
              </p> */}
              <IoStar size="2rem" color="#F2D32F" />
              <p className="text-lg ml-2 font-bold text-dark-grey">
                3
              </p>
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
        className="flex relative shadow-xl w-[16rem] md:w-[20rem] lg:w-[24rem] bg-white rounded-[1.5rem] mt-12 duration-500"
        onClick={() => setModalOpen(true)}
      >
        <div className="flex flex-col duration-500">
          <div className="relative overflow-hidden rounded-3xl duration-500">
            <div className="w-[16rem] md:w-[20rem] lg:w-[24rem] duration-500">
              <Image
                alt={`${NFT.image}-image`}
                src={
                  isImageError
                    ? '/not-found.png'
                    : `https://res.cloudinary.com/demo/image/fetch/${NFT.image}` ||
                      ''
                }
                className="rounded-[1.5rem] duration-500"
                onError={() => setImageError(true)}
                width="1230"
                quality="100"
                height="1230"
                layout={'responsive'}
              />
            </div>
          </div>

          <div className="my-5 mb-8 px-8 w-full">
            <h1 className="text-black font-bold text-[1.7rem] h-auto break-words">
              {NFT.title}
            </h1>
            <div className="flex mt-[0.2rem] items-center flex-row ml-[-0.2rem]">
              <IoStar size="2rem" color="#F2D32F" />
              <p className="text-lg ml-2 font-bold text-dark-grey">3</p>
            </div>
            <span className="flex my-4 h-[0.4rem] w-full bg-gray-50 rounded-full" />

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
      </div>
    </>
  );
};

export default RectangleNFTCard;
