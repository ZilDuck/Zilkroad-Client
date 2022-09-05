import * as api from '../../../lib/api.js'

export async function get({ params, url: { searchParams } }) {
  const { contractId } = params
  const user = searchParams.get('user')

  return await api.get(`report/${contractId}/${user}`)
}