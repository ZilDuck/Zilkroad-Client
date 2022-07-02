import * as api from '../../lib/api.js'

export async function get() {
  let collections

  collections = await api.get(`collection-ranks`).catch((error) => console.log(error))

  collections = collections.map((collection) => {
    const {
      nonfungible_address: id,
      nonfungible_name: name,
      nonfungible_symbol: description,
      sales_history: [
        {
          sitewide_listed: listed,
          sitewide_sold: volume,
          sitewide_sum_royalty_sent: royalty,
          sitewide_unique_royalty_recipient: count
        }
      ]
    } = collection
    return { id, name, description, listed, volume, royalty, count }
  })

  return {
    body: collections
  }
}
