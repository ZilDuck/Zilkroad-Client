import * as api from "../../lib/api.js";

export async function get({ url: { searchParams } }) {
  
  const page = searchParams.get('page') ?? 1
  const collection = searchParams.get('collection') ?? ''
  const filter = searchParams.get('filter') ?? 'recently-listed'

  const marketplace = await api.get(`marketplace?page=${page}&contract=${collection}&filter=${filter}`)
  
  return {
    body: {
      nfts: marketplace?.nfts ?? [],
      pagination: marketplace?.pagination,
      collections: marketplace?.collections?? [],
    }
  }
}