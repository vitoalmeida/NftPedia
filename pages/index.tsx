import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => (
  <div className="bg[#000]">
    <Head>
      <title>NextPedia</title>
    </Head>
    <main>
      <h1>Hello World</h1>
    </main>
  </div>
);

export default Home;

export const getStaticProps = () => ({
  props: {},
});
