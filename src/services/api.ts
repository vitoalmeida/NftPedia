const apiKey = 'uVQGU_gYnoYkldNsnOWYE2fUwqBX0y4K';
const baseUrl = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;

async function getAddressNFTs(
  owner: string,
  contractAddress?: string,
  retryAttempt: number = 0
) {
  if (retryAttempt === 5) {
    console.log('');
    return;
  }
  if (owner) {
    let data: unknown;
    try {
      if (contractAddress) {
        data = await fetch(
          `${baseUrl}/getNFTs?owner=${owner}&contractAddresses=${contractAddress}`
        ).then(data => data.json());
      } else {
        data = await fetch(`${baseUrl}/getNFTs?owner=${owner}`).then(data =>
          data.json()
        );
      }

      return data;
    } catch (e) {
      console.log(e);
      getAddressNFTs(owner, contractAddress, retryAttempt + 1);
    }
  }
}

const getNFTsMetadata = async NFTS => {
  const NFTsMetadata = await Promise.allSettled(
    NFTS.map(async NFT => {
      const metadata = await fetch(
        `${baseUrl}/getNFTMetadata?contractAddress=${NFT.contract.address}&tokenId=${NFT.id.tokenId}`
      ).then(data => data.json());

      let imageUrl;
      if (metadata?.media[0].gateway.length) {
        imageUrl = metadata.media[0].gateway;
      } else {
        imageUrl = 'https://via.placeholder.com/500';
      }

      return {
        id: NFT.id.tokenId || null,
        contractAddress: NFT.contract.address || null,
        image: imageUrl || null,
        title: metadata.metadata.name || null,
        description: metadata.metadata.description || null,
        attributes: metadata.metadata.attributes || null,
      };
    })
  );

  return NFTsMetadata;
};

const fetchNFTs = async (owner: string, contractAddress?: string) => {
  const data: any = await getAddressNFTs(owner, contractAddress);

  if (data.ownedNfts.length) {
    const NFTs = await getNFTsMetadata(data.ownedNfts);
    let fullfilledNFTs = NFTs.filter(NFT => NFT.status == 'fulfilled');

    return fullfilledNFTs;
  }
};

export { fetchNFTs };
