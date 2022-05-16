/// <reference types="@sveltejs/kit" />
import type { Observable } from 'rxjs'
import type { Contracts } from '@zilliqa-js/contract'
import type { Blockchain } from '@zilliqa-js/blockchain'
import type { BN, bytes, Long, units } from '@zilliqa-js/util'

export declare global {
  type Nft = {
    uri: string
    contract?: string
    name: string
    symbol: string
    id: number
    lastPrice?: string
  }

  type Attribute = {
    traitType: string;
    value: string;
  }

  type Contract = {
    address: string;
    name: string;
    symbol: string;
  }

  type Token = {
    id: string;
    name: string;
  }

  type Listing = {
    id: string;
    price: string;
    fungible: Fungible;
    block: number;
    unixtime: number;
    user: string;
    contract: Contract & { verified: boolean };
    token: Token & { attributes: Attribute[] };
  }

  type SingleListing = {
    id: string
    price: string
    seller: string
    fungible: Fungible
  }

  type Details = {
    listings: string
    sales: string
    buys: string
  }

  type Activity = {
    activity: 'listed' | 'delisted' | 'sold'
    unixtime: number
    block: string
    price: string
    fungible: Fungible
  }

  type Collection = {
    address: string
    symbol: string
    name: string
    creator: string;
    verified: {
      description: string
      '32_21_image': string
      '3_4_image': string
    }
  }

  interface Metadata {
    contract: {
      symbol: string
      name: string
      address: string
    }
    token: {
      id: string
      name: string
      attributes: { traitType: string, value: string }[] // eslint-disable-line
    }
  }

   type Sale = {
     id: string
     price: string
     block: string
     unixtime: string
     fungiblePrice: string
     user: string
     buyer: string
     fungible: Fungible
     contract: Contract & {
       verified: boolean
     }
     token: {
       id: string
       name: string
     }
   }

   type SaleHistory = {
     listing: number;
     block: number;
     unixtime: number;
    fungible_price: number; // eslint-disable-line
     price: number;
     seller: string;
     buyer: string;
     fungible: Fungible;
   }

   type NftMetadata = {
     token: {
       attributes: {
         traitType: string;
         value: string;
       }[];
       id: string;
       name?: string;
     };
     contract: {
       symbol: string;
       name: string;
       address: string;
     };
   }

   type CollectionData = {
     floor: number
     sevenWeekVolume: number
   }

   type Fungible = {
     address: string;
     name: string;
     symbol: string;
     decimals: number;
   }

  type Network = 'mainnet' | 'testnet' | 'private'

  export type UserActivity = {
    activity: 'bought' | 'sold' | 'delisted';
    fungible: Fungible;
    unixtime: string;
    block: string;
    tokenId: string;
    contract: string;
    price: string;
    royaltyAmount: null | string;
    royaltyAmountUsd: null | string;
    priceAfterTax: null | string;
    priceAfterTaxUsd: null | string;
  }

  type Window = {
    zilPay: {
      wallet: {
        connect: () => Promise<boolean>
        net: Network
        isConnect: boolean
        isEnable: boolean
        defaultAccount?: {
          base16: string
          bech32: string
        }
        observableAccount: () => Observable<{ base16: string; bech32: string }>
        observableNetwork: () => Observable<Network>
      }
      contracts: Contracts
      blockchain: Blockchain
      utils: { BN: typeof BN, bytes: typeof bytes, Long: typeof Long, units: typeof units } // eslint-disable-line
    }
  }
}
