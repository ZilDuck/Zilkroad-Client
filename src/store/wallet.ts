import type { Writable } from 'svelte/store'
import { browser } from '$app/env'
import { writable } from 'svelte/store'
import * as Cookie from 'cookie'
import * as api from '../lib/api.js'


type Awaited<T> = T extends PromiseLike<infer U> ? U : T

export type Wallet = {
  base16?: string
  bech32?: string
  isConnected: boolean
  network?: typeof window.zilPay.wallet.net
  nonce?: number
  balances?: object
}

const createWalletStore = () => {
  const { subscribe, update }: Writable<Wallet> = writable({
    isConnected: false
  })

  const updateWalletData = async () => {
    const { wallet, blockchain } = window.zilPay

    if (!wallet.defaultAccount) {
      return
    }

    const { base16, bech32 } = wallet.defaultAccount
    const network = wallet.net

    const [getBalanceResponse, userBalancesResponse] = await Promise.all([
      blockchain.getBalance(base16) as Promise<{ result: { nonce: number, balance: string } }>,
      fetch(`/wallet/${base16}/balances.json`).then(async response => response.json())
    ]).catch((error) => console.log(error))

    document.cookie = Cookie.serialize('userAddress', base16, { path: '' })
    document.cookie = Cookie.serialize('userAddress', base16, { path: '/wallet' })

    update(() => ({
      base16,
      bech32,
      network,
      isConnected: true,
      balances: userBalancesResponse,
      nonce: getBalanceResponse.result.nonce
    }))
  }

  const connect = async () => {
    const { wallet } = window.zilPay

    const wasConnectionSuccessful = await wallet.connect()

    if (!wasConnectionSuccessful) return false

    wallet.observableAccount().subscribe(updateWalletData)

    wallet.observableNetwork().subscribe((network) => {
      update((w) => ({ ...w, network }))
    })

    void updateWalletData()
  }

  const disconnect = async () => {
    const { wallet } = window.zilPay
    await wallet.disconnect()
    update(() => ({
      isConnected: false
    }))
  }

  const increaseNonce = () => {
    update((w) => ({
      ...w,
      nonce: w.nonce + 1
    }))
  }

  const fetchNonce = async () => {
    return new Promise<number>((resolve) => {
      const unsubscribe = subscribe(async (wallet) => {
        const getBalanceResponse = await window.zilPay.blockchain.getBalance(
          wallet.base16
        ) as { result: { nonce: number, balance: string }}
        update((w) => ({
          ...w,
          nonce: getBalanceResponse.result.nonce
        }))
        unsubscribe()
        resolve(getBalanceResponse.result.nonce)
      })
    })
  }

  const getNonce = async () => {
    let nonce: number
    subscribe((wallet) => {
      nonce = wallet.nonce
    })()
    return nonce
  }

  if (browser && window.zilPay && window.zilPay.wallet.isEnable && window.zilPay.wallet.isConnect) {
    void connect()
  }

  return {
    subscribe,
    connect,
    disconnect,
    increaseNonce,
    fetchNonce,
    getNonce
  }
}

export default createWalletStore()
