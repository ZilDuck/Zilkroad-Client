// import nft1 from '../../../../json/collection/1/nfts/nft1.json'
// import nft2 from '../../../../json/collection/1/nfts/nft2.json'
import * as api from '../../../../lib/api.js'


export async function get({ params }) {
  const { contractId, nftId } = params
  let nft

  // if (nftId === '1') {
  //   nft = nft1
  //   return {
  //     body: nft
  //   }
  // }
  //
  // if (nftId === '2') {
  //   nft = nft2
  //   return {
  //     body: nft
  //   }
  // }

  nft = await api.get(`nfts/${contractId}/${nftId}`).catch((error) => console.log(error))
  return {
    body: nft
  }
}