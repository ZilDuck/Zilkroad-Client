import * as api from '../lib/api.js'

export async function get() {
  let wallets = []

  // wallets = await api.post(`GetTopWalletActivityForPeriod`, {
  //   limit_rows: 4,
  //   offset_rows: 0,
  //   unix_from: Date.now(),
  //   unix_to: Date.now() - 2419200 // one month
  // })

  return {
    body: wallets
  }
}
