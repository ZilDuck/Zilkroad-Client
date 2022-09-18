import type { Writable } from 'svelte/store'
import wallet from './wallet'
import { setSpender } from '../zilpay/nonfungible'
import { userList, userBuy, userReturn, userEditListing } from '../zilpay/marketplace'
import { writable } from 'svelte/store'
import { increaseAllowance } from '../zilpay/fungible'
import { zilkroad } from '../apis/zilkroad'
import { toast } from './toast'

export type Marketplace = {
  verifiedContracts: string[],
  approvedFungibles: Fungible[]
}

const createMarketplaceStore = () => {
  const { subscribe, update }: Writable<Marketplace> = writable({ verifiedContracts: [], approvedFungibles: [] })
  const api = zilkroad(fetch)


  const approveNftSpender = async (
    nftContract: string,
    tokenId: string
  ) => {
    const nonce = await wallet.getNonce()

    const spenderTx = await setSpender(nftContract, tokenId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected spender set', type: 'error' })
    })
    wallet.increaseNonce()
    return { spenderTx }
  }

  const listNft = async (
    nftContract: string,
    tokenId: string,
    fungible: string,
    sellPrice: number
  ) => {
    const nonce = await wallet.getNonce()

    const listTx = await userList(nftContract, tokenId, fungible, sellPrice, {
      nonce: nonce + 2
    }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected listing', type: 'error' })
    })
    wallet.increaseNonce()

    return { listTx }
  }

  const delistNft = async (orderId: string) => {
    const nonce = await wallet.getNonce()
    const listTx = await userReturn(orderId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected delisting', type: 'error' })
    })
    wallet.increaseNonce()

    return { listTx }
  }

  const buyNft = async (fungibleAddress: string, listingPrice: string, listingId: string) => {
    const nonce = await wallet.getNonce()
    let userCancelled = false

    const increaseTx = await increaseAllowance(fungibleAddress, listingPrice, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected allowance increase', type: 'error' })
      userCancelled = true
    })
    wallet.increaseNonce()
    if (userCancelled) {
      return
    }
    toast.add({ message: 'Request sent', type: 'success' })

    const buyTx = await userBuy(listingId, { nonce: nonce + 2 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected buy', type: 'error' })
      userCancelled = true
    })
    if (userCancelled) {
      return
    }
    wallet.increaseNonce()
    toast.add({ message: 'Request sent', type: 'success' })

    return { increaseTx, buyTx }
  }

  const editListedNft = async (
    orderId: string,
    fungible: string,
    sellPrice: string
  ) => {
    const nonce = await wallet.getNonce()

    const editTx = await userEditListing(orderId, fungible, sellPrice, {
      nonce: nonce + 2
    }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected edit', type: 'error' })
    })
    wallet.increaseNonce()

    return { editTx }
  }

  api.getVerifiedContracts().then((verifiedContracts) => {
    update((m) => ({ ...m, verifiedContracts }))
  })

  api.getApprovedFungibles().then((approvedFungibles) => {
    update((m) => ({ ...m, approvedFungibles }))
  })

  return {
    subscribe,
    approveNftSpender,
    listNft,
    delistNft,
    buyNft,
    editListedNft
  }
}

export default createMarketplaceStore()
