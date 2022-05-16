import collection1 from '../../../json/collection/1/collection1.json'
import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { contractId } = params
  let collection

  if (contractId === '1') {
    return {
      body: collection1
    }
  }

  collection = await api.get(`collections/${contractId}`).catch((error) => console.log(error))

  return {
    body: collection
  }
}
