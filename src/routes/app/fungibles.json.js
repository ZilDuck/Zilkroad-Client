import * as api from '../../lib/api.js'

export async function get() {

  const fungibles = await api.get(`fungible`).catch((e) => console.log(e)) ?? [{}]

  return {
    body: fungibles
  }
}