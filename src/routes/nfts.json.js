import featuredNfts from '../json/home/featuredNfts.json'
import popularNfts from '../json/home/popularNfts.json'
import recentlySold from '../json/home/recentlySoldNfts.json'
import * as api from '../lib/api.js'

export async function get({ url: { searchParams } }) {
  let nfts = []
  let type = searchParams.get('type')

  if (type === 'featured') {
    nfts = await api.get(`nfts/?filter=featured`).catch((error) => console.error(error))
  }
  if (type === 'recentlyListed') {
    nfts = await api.get(`nfts/?filter=recently-listed`).catch((error) => console.error(error))
  }
  if (type === 'recentlySold') {
    nfts = await api.get(`nfts/?filter=recently-sold`).catch((error) => console.error(error))
  }

  return {
    body: nfts
  }
}
