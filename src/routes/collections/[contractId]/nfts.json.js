import collectionNFTs from '../../../json/collection/1/nfts.json'
import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { contractId } = params
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 16
  let nfts = []

  if (contractId === '1') {
    nfts = collectionNFTs
    return {
      body: nfts
    }
  }

  nfts = await api.get(`collections/${contractId}/nfts?page=${page}&limit=${limit}`)

  return {
    body: nfts
  }
}