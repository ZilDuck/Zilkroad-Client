import type { TxParams } from '@zilliqa-js/account'
import { contract } from './contract'
import { variables } from '../lib/variables.js'

export const { marketplaceAddress } = variables

export const userList = async (
  nftContract: string,
  tokenId: string,
  fungible: string,
  sellPrice: string,
  params: Partial<TxParams> = {}
) => {
  const { call } = contract(marketplaceAddress)
  return await call(
    'UserList',
    [
      {
        vname: 'nonfungible',
        type: 'ByStr20',
        value: nftContract
      },
      {
        vname: 'token_id',
        type: 'Uint256',
        value: tokenId.toString()
      },
      {
        vname: 'fungible',
        type: 'ByStr20',
        value: fungible
      },
      {
        vname: 'sell_price',
        type: 'Uint128',
        value: sellPrice.toString()
      }
    ],
    params
  )
}

export const userEditListing = async (
  orderId: string,
  fungible: string,
  sellPrice: string,
  params: Partial<TxParams> = {}
) => {
  const { call } = contract(marketplaceAddress)
  return await call(
    'UserEditListingPrice',
    [
      {
        vname: 'oid',
        type: 'Uint256',
        value: orderId
      },
      {
        vname: 'new_fungible',
        type: 'ByStr20',
        value: fungible
      },
      {
        vname: 'new_sell_price',
        type: 'Uint128',
        value: sellPrice.toString()
      }
    ],
    params
  )
}

export const userReturn = async (orderId: string, params: Partial<TxParams> = {}) => {
  const { call } = contract(marketplaceAddress)
  return await call(
    'UserReturn',
    [
      {
        vname: 'oid',
        type: 'Uint256',
        value: orderId
      }
    ],
    params
  )
}

export const userBuy = async (orderId: string, params: Partial<TxParams> = {}) => {
  const { call } = contract(marketplaceAddress)
  return await call(
    'UserBuy',
    [
      {
        vname: 'oid',
        type: 'Uint256',
        value: orderId
      }
    ],
    params
  )
}

export const getListing = async (orderId: string) => {
  const { getSubstate } = contract(marketplaceAddress)
  const orderState = (await getSubstate('listing_map', [orderId])) as
    | {
      argtypes: []
      arguments: [
        {
          argtypes: []
          arguments: [string, string]
          constructor: string
        },
        {
          argtypes: []
          arguments: [string, string, string]
          constructor: string
        }
      ]
      constructor: string
    }
    | undefined

  if (!orderState) return undefined

  const nft = orderState.arguments.find((argument) =>
    argument.constructor.includes('NFT')
  ) as typeof orderState.arguments[0]
  const order = orderState.arguments.find((argument) =>
    argument.constructor.includes('Order')
  ) as typeof orderState.arguments[1]

  return {
    nftContract: nft.arguments[0],
    tokenId: nft.arguments[1],
    user: order.arguments[0],
    fungible: order.arguments[1],
    amount: order.arguments[2]
  }
}
