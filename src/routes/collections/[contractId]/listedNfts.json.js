import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { contractId } = params
  const page = searchParams.get('page') ?? 1
  const limit = searchParams.get('limit') ?? 10
  let listedNfts = []

  listedNfts = await api.get(`collections/${contractId}/listedNfts?page=${page}&limit=${limit}`).catch((error) => console.log(error))

  console.log("NFTS: ", listedNfts)
  return {
    body: listedNfts
  }
}