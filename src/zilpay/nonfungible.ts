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
        value: tokenId.toString(),
        type: 'Uint256'
      }
    ],
    params
  )
}

export const burn = async (
  nftContract: string,
  tokenId: string,
  params: Partial<TxParams> = {}
) => {
  return await contract(nftContract).call(
    'Burn',
    [
      {
        vname: 'token_id',
        value: tokenId,
        type: 'Uint256'
      }
    ],
    params
  )
}

export const transferFrom = async (
  nftContract: string,
  to: string,
  tokenId: string,
  params: Partial<TxParams> = {}
) => {
  return await contract(nftContract).call(
    'TransferFrom',
    [
      {
        vname: 'to',
        value: to,
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

export const hasSpender = async (
  nftContract: string,
  tokenId: string
) => {
  const tokenContract = contract(nftContract)
  const spender = await tokenContract.getSubstate('spenders', [String(tokenId)])
  return spender === marketplaceAddress
}
