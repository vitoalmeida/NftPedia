import { useEffect, useState } from 'react';
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from '../utils/interact';
// Components
import Header from '../components/Header';
import Input from '../components/Input';
// Libraries
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik } from 'formik';
// Types
import { nftMetadata, MinterValuesError } from '../@types/general';
import Head from 'next/head';

const Minter: React.FC = () => {
  //State variables
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');
  
  // Initial form values
  const initialValues: nftMetadata = {
    url: undefined,
    name: undefined,
    description: undefined,
  };

  useEffect(() => {
    // Verify if have a current adress connected
    const getCurrentWallet = async () => {
      const walletResponse = await getCurrentWalletConnected();
      setWallet(walletResponse.address);
      setStatus(walletResponse.status);
    };

    getCurrentWallet();
    addWalletListener();
  }, []);

  // Show a beautiful toast
  const showToastNotification = (returnStatus: string) => {
    switch (returnStatus) {
      case 'successfully_connected':
        toast.success('Conectado com sucesso!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case 'not_installed':
        toast.error('MetaMask não instalada!', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
    }
  };

  const connectWalletPressed = async () => {
    // Connect to MetaMask
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    showToastNotification(walletResponse.status);
  };
  
  // Function to listen changes on users wallet
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus('connected');
        } else {
          setWallet('');
          setStatus('not_connected');
        }
      });
    } else {
      setStatus('not_installed');
    }
  }
  
  const handleMint = async (values: nftMetadata) => {
    const { status } = await mintNFT(
      values.url,
      values.name,
      values.description
      );
      setStatus(status);
    };
    
  return (
    <main className="flex flex-1 h-screen bg-dark-green">
      <Head>
        <title>Minter - NFTsPedia</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Mint your's nfts"
        />
        <meta name="keywords" content="Mint, Nft" />
        <meta name="author" content="Vitor Machado" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <Header />

      <div className="flex flex-col w-full my-36 px-14 py-10 mx-20 bg-white rounded-[2rem]">
        {walletAddress.length ? (
          <>
            <h1 id="title" className="text-[2.4rem] font-semibold">
              Minter
            </h1>
            <p className="font-medium mt-[-0.5rem] mb-5 text-dark-green">
              Connectado:
              <span className="text-gray-500">
                {' ' +
                  String(walletAddress).substring(0, 6) +
                  '...' +
                  String(walletAddress).substring(38)}
              </span>
            </p>
            <p className="mb-3 mt-2">
              Simplesmente adicione o link de seu ativo, nome, descrição e
              aperte o botão "Mint NFT".
            </p>
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={initialValues}
              validate={values => {
                const errors: MinterValuesError = {};
                if (!values.url) {
                  errors.url = 'Preencha este campo';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  handleMint(values);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    name="url"
                    placeholder="Ex.: https://gateway.pinata.cloud/ipfs/<hash>"
                    label={'Link do ativo'}
                    onChange={handleChange}
                    value={values.url}
                    icon="frame"
                    errors={errors.url}
                    onBlur={handleBlur}
                  />
                  <Input
                    name="name"
                    placeholder="Ex.: Funny NFT"
                    label={'Nome do NFT'}
                    onChange={handleChange}
                    value={values.name}
                    icon="name"
                    errors={errors.name}
                    onBlur={handleBlur}
                  />
                  <Input
                    name="description"
                    placeholder="Ex.: The most fun NFT"
                    label={'Descrição'}
                    onChange={handleChange}
                    value={values.description}
                    icon="description"
                    errors={errors.description}
                    onBlur={handleBlur}
                  />
                  <div className="flex w-full justify-center">
                    <button
                      type="submit"
                      id="mintButton"
                      className="mt-8 w-48 h-12 rounded-full bg-[#1b1b1b]"
                    >
                      <p className="font-semibold text-white">Mint NFT</p>
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center my-auto pb-20">
            <h1 id="title" className="text-[2.5rem] font-semibold">
              Minter
            </h1>
            <p className="mt-[-0.5rem] pb-5">
              Para usar o Minter, conecte sua carteira MetaMask.
            </p>
            <button
              id="walletButton"
              className="w-48 h-12 rounded-full bg-[#fa7c06]"
              onClick={connectWalletPressed}
            >
              <p className="font-semibold text-white">Connect Wallet</p>
            </button>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
};

export default Minter;
