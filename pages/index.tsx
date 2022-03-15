import React from 'react';
import Head from 'next/head';
import Header from '../components/Header.tsx';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>NextPedia</title>
    </Head>

    <Header />

    <main></main>
  </div>
);

export default Home;

export const getStaticProps = () => ({
  props: {},
});
