import { nftMetadata } from '../@types/general';
import { pinJSONToIPFS } from './pinata';

require('dotenv').config();
const alchemyKey = "https://eth-ropsten.alchemyapi.io/v2/kj2yeZHzg6XIYDGvqXS1mcjyt3DAikLF";
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
const web3 = alchemyKey ? createAlchemyWeb3(alchemyKey) : '';

const contractABI = require('../contract-abi.json');
const contractAddress = '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE';

/**  @Wallet_Connect */
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj = {
        status: 'successfully_connected',
        address: addressArray[0],
      };
      return obj;
    } catch (err: any) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: 'not_installed',
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: 'connected',
        };
      } else {
        return {
          address: '',
          status: 'not_connected',
        };
      }
    } catch (err: any) {
      return {
        address: '',
        status: 'error',
      };
    }
  } else {
    return {
      address: '',
      status: 'not_installed',
    };
  }
};

/**  @Minter */
export const mintNFT = async (url, name, description) => {
  // Error handling
  if (url.trim() == '' || name.trim() == '' || description.trim() == '') {
    return {
      success: false,
      status: 'empty_input',
    };
  }

  // Make metadata
  const metadata: nftMetadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  // Make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: '😢 Something went wrong while uploading your tokenURI.',
    };
  }
  
  const tokenURI = pinataResponse.pinataUrl;
  
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  // Set up Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  };

  // Sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        'Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' +
        txHash,
    };
  } catch (error: any) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};
