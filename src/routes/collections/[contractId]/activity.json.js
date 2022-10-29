import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { contractId } = params
  let data = []

  data = await api.get(`collections/${contractId}/activity`).catch((error) => console.log(error))

  return {
    body: data
  }
}