import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { contractId } = params
  let metadata = []

  console.log("COntract: ", contractId)

  metadata = await api.get(`metadata/${contractId}`).catch((error) => console.log(error))

  return {
    body: metadata
  }
}