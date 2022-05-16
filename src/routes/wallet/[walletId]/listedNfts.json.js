import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { walletId } = params
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 16
  let wallet

  wallet = await api.get(`wallets/${walletId}/listedNfts?page=${page}&limit=${limit}`)

  return {
    body: wallet
  }
}
