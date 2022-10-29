import * as api from '../../lib/api.js'

export async function get() {
  let collections

  collections = await api.get(`collection-ranks`).catch((error) => console.log(error))

  collections = collections.map((collection) => {
    const {
      nonfungible_address: contract_address_b16,
      contract_address_b32: contract_address_b32,
      nonfungible_name: name,
      nonfungible_symbol: description,
      royalty_bps: royalty,
      primary_sales: [
        {
          lifetime_sales_usd: volume,
          lifetime_royalty_usd: royalty_usd,
          lifetime_quantity_sold: count
        }
      ],
      nfts_minted: minted,
      stats: {
        listed_tokens: listed
      }
    } = collection
    return { contract_address_b16, contract_address_b32, name, description, listed, minted, volume, royalty, royalty_usd, count }
  })

  return {
    body: collections
  }
}
