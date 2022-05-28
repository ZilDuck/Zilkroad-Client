import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { walletId } = params
  let wallet

  wallet = await api.get(`wallets/${walletId}/balances`)

  return {
    body: wallet
  }
}