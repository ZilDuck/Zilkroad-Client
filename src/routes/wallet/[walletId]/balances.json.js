import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { walletId } = params
  let wallet

  wallet = await api.get(`user-fungible/${walletId}`).catch((e) => console.log(e))

  return {
    body: wallet
  }
}