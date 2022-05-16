import type { Writable } from 'svelte/store'
import wallet from './wallet'
import { setSpender } from '../zilpay/nonfungible'
import { userList, userBuy, userReturn } from '../zilpay/marketplace'
import { writable } from 'svelte/store'
import { increaseAllowance } from '../zilpay/fungible'
import { zilkroad } from '../apis/zilkroad'
import { toast } from './toast'

export type Marketplace = {
  verifiedContracts: string[]
}

const createMarketplaceStore = () => {
  const { subscribe, update }: Writable<Marketplace> = writable({ verifiedContracts: [] })
  const api = zilkroad(fetch)

  const listNft = async (
    nftContract: string,
    tokenId: string,
    fungible: string,
    sellPrice: number
  ) => {
    const nonce = await wallet.getNonce()

    const spenderTx = await setSpender(nftContract, tokenId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected spender set', type: 'error' })
    })
    wallet.increaseNonce()

    const listTx = await userList(nftContract, tokenId, fungible, sellPrice, {
      nonce: nonce + 2
    }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected listing', type: 'error' })
    })
    wallet.increaseNonce()

    return { spenderTx, listTx }
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

  api.getVerifiedContracts().then((verifiedContracts) => {
    update((m) => ({ ...m, verifiedContracts }))
  })

  return {
    subscribe,
    listNft,
    delistNft,
    buyNft
  }
}

export default createMarketplaceStore()
