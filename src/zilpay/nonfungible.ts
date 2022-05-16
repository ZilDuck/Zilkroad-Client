import type { TxParams } from '@zilliqa-js/account'
import { contract } from './contract'
import { marketplaceAddress } from './marketplace'

export const setSpender = async (
  nftContract: string,
  tokenId: string,
  params: Partial<TxParams> = {}
) => {
  return await contract(nftContract).call(
    'SetSpender',
    [
      {
        vname: 'spender',
        value: marketplaceAddress,
        type: 'ByStr20'
      },
      {
        vname: 'token_id',
        value: tokenId,
        type: 'Uint256'
      }
    ],
    params
  )
}
