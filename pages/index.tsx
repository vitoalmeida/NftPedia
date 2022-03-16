import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>NextPedia</title>
    </Head>

    <Header />

    <main className="flex flex-col z-0 overflow-hidden">
      <div className="flex w-full h-[540px] flex-row mt-16 ">
        <div className="flex flex-col ml-auto px-6 mt-36">
          <text className="text-black font-extrabold text-4xl">Nos te</text>
          <text className="text-black font-extrabold text-4xl">ajudamos a</text>
          <text className="text-dark-green font-extrabold text-4xl">
            encontrar um
            <br /> hotel
          </text>
          <text className="text-black font-extrabold text-4xl">
            que seja sua
          </text>
          <text className="text-black font-extrabold text-4xl">cara</text>
        </div>
        <div className="flex w-1/2">
          {/* <Image
            className="absolute"
            src="/magnifier.png"
            width="500"
            height="500"
            layout="fixed"
          /> */}
        </div>
      </div>
      <div className="flex w-full">
        <Image src="/first-wave.png" width="2880" height="730" />
      </div>
      <div className="flex w-full h-[700px] px-10 bg-light-grey justify-center">
        <div className="flex flex-col w-full h- px-6 py-6 bg-white rounded-2xl">
          <form>
            <Input name="location" placeholder="Going to" />
            <Input name="travelers" placeholder="Travelers" type="number" />
          </form>
        </div>
      </div>
      <div className="flex w-full justifymt-[-300px]">
        <Image src="/second-wave.png" width="2875" height="387" />
      </div>
      <div className="flex w-full h-96 bg-greyish"></div>
    </main>
  </div>
);

export default Home;

export const getStaticProps = () => ({
  props: {},
});
