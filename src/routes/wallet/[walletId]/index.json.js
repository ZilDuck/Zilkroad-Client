import wallet1 from '../../../json/wallet/wallet1.json'
import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { walletId } = params
  let wallet

  // mock data
  if (walletId === '1') {
    wallet = wallet1
    return {
      body: wallet
    }
  }

  wallet = await api.get(`wallets/${walletId}`)

  return {
    body: wallet
  }
}
