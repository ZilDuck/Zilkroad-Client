import type { Writable } from 'svelte/store'
import wallet from './wallet'
import { setSpender, burn, transferFrom } from '../zilpay/nonfungible'
import { userList, userBuy, userReturn, userEditListing } from '../zilpay/marketplace'
import { writable } from 'svelte/store'
import { increaseAllowance } from '../zilpay/fungible'
import { zilkroad } from '../apis/zilkroad'
import { toast } from './toast'
import { transaction } from './transaction'
import { pollTx } from '../zilpay/poll-tx'

export type Marketplace = {
  verifiedContracts: string[]
  approvedFungibles: Fungible[]
}

const createMarketplaceStore = () => {
  const { subscribe, update }: Writable<Marketplace> = writable({ verifiedContracts: [], approvedFungibles: [] })
  const api = zilkroad(fetch)

  const approveNftSpender = async (nftContract: string, tokenId: string) => {
    const nonce = await wallet.getNonce()

    const spenderTx = await setSpender(nftContract, tokenId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected spender set', type: 'error' })
    })
    if (spenderTx) {
      toast.add({ message: 'Approving Zilkroad as Nft Spender', type: 'info' })
      const transactionId = transaction.add({
        message: 'Approving NFT Spender',
        status: 'pending',
        tx: spenderTx,
        txType: 'SetSpender',
        nftContract,
        nftTokenId: tokenId
      })
      const txResponse = await pollTx(spenderTx).catch(() => {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'failed')
        toast.add({ message: 'Approval Failed', type: 'error' })
      })
      if (txResponse) {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'success')
        toast.add({ message: 'Approval Confirmed', type: 'success' })
      }
    }
    wallet.increaseNonce()
    return { spenderTx }
  }

  const listNft = async (nftContract: string, tokenId: string, fungible: string, sellPrice: number) => {
    const nonce = await wallet.getNonce()

    const listTx = await userList(nftContract, tokenId, fungible, sellPrice, {
      nonce: nonce + 2
    }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected listing', type: 'error' })
    })
    if (listTx) {
      toast.add({ message: 'Listing NFT', type: 'info' })
      const transactionId = transaction.add({
        message: 'Listing NFT',
        status: 'pending',
        txType: 'UserList',
        tx: listTx,
        nftContract,
        nftTokenId: tokenId
      })
      const txResponse = await pollTx(listTx).catch(() => {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'failed')
        toast.add({ message: 'Listing Failed', type: 'error' })
      })
      if (txResponse) {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'success')
        toast.add({ message: 'Listing Confirmed', type: 'success' })
      }
    }
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

  const increaseFungibleAllowance = async (fungibleAddress: string, listingPrice: string) => {
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

    return { increaseTx }
  }

  const buyNft = async (fungibleAddress: string, listingPrice: string, listingId: string) => {
    const nonce = await wallet.getNonce()
    let userCancelled = false

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

    return { buyTx }
  }

  const editListedNft = async (orderId: string, fungible: string, sellPrice: string, name: string, nftContract: string, tokenId: string) => {
    const nonce = await wallet.getNonce()

    const editTx = await userEditListing(orderId, fungible, sellPrice, {
      nonce: nonce + 2
    }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected edit', type: 'error' })
    })

    if (editTx) {
      toast.add({ message: 'Editing Listing', type: 'info' })
      const transactionId = transaction.add({
        message: `Editing ${name}`,
        status: 'pending',
        txType: 'UserEditListingPrice',
        tx: editTx,
        nftContract,
        nftTokenId: tokenId
      })
      const txResponse = await pollTx(editTx).catch(() => {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'failed')
        toast.add({ message: 'Edit Failed', type: 'error' })
      })
      if (txResponse) {
        console.log('transactionid: ', transactionId)
        transaction.updateStatus(transactionId, 'success')
        toast.add({ message: 'Edit Confirmed', type: 'success' })
      }
    }
    wallet.increaseNonce()

    return { editTx }
  }

  const burnNft = async (nftContract: string, tokenId: string) => {
    const nonce = await wallet.getNonce()

    const burnTx = await burn(nftContract, tokenId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected burn', type: 'error' })
    })
    wallet.increaseNonce()
    return { burnTx }
  }

  const transferNft = async (nftContract: string, to: string, tokenId: string) => {
    const nonce = await wallet.getNonce()

    const transferFromTx = await transferFrom(nftContract, to, tokenId, { nonce: nonce + 1 }).catch((error) => {
      console.log(error)
      toast.add({ message: 'User rejected transfer', type: 'error' })
    })
    wallet.increaseNonce()
    return { transferFromTx }
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
    increaseFungibleAllowance,
    buyNft,
    editListedNft,
    burnNft,
    transferNft
  }
}

export default createMarketplaceStore()
