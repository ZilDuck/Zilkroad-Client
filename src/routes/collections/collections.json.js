import * as api from '../../lib/api.js'

export async function get() {
  let collections

  collections = await api.get(`collection-ranks`).catch((error) => console.log(error))

  collections = collections.map((collection) => {
    const {
      nonfungible_address: id,
      nonfungible_name: name,
      nonfungible_symbol: description,
      primary_sales: [
        {
          lifetime_sales_usd: volume,
          lifetime_royalty_usd: royalty,
          lifetime_quantity_sold: count
        }
      ],
      stats: {
        listed_tokens: listed
      }
    } = collection
    return { id, name, description, listed, volume, royalty, count }
  })

  return {
    body: collections
  }
}
