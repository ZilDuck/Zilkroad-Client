import * as api from '../lib/api.js'

export async function get() {
  let wallets = []

  wallets = await api.get(`wallet-activities?filter=royalties`)

  return {
    body: wallets
  }
}
