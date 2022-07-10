import * as api from '../../../lib/api.js'

export async function get({ params }) {
  const { query } = params
  let queryResult

  queryResult = await api.get(`search/${query}`)
  queryResult = convertToArrayIfNotArray(queryResult);

  return {
    body: queryResult
  }
}

/**
 * Temporary until API returns array always
 *
 * @param queryResult
 * @returns {*[]}
 */
function convertToArrayIfNotArray(queryResult) {
  if (!Array.isArray(queryResult)) {
    queryResult = [queryResult];
  }
  return queryResult;
}