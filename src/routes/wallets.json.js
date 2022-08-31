import * as api from '../lib/api.js'

export async function get() {
  let wallets = await api.get(`wallet-activities?filter=royalties`).catch((e) => console.log(e)) ?? []

  return {
    body: wallets
  }
}
