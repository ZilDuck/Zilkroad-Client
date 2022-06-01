import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { query } = params
  let queryResult

  queryResult = await api.get(`search/${query}`)

  return {
    body: queryResult
  }
}