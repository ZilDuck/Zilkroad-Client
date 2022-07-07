import * as api from '../../lib/api.js';

export async function get({ url: { searchParams } }) {
  let type = searchParams.get('type')
  let wallets = [];

  if (type === 'buyers') {
    wallets = await api.get(`wallet-activities?filter=buyers`)
  }
  if (type === 'sellers') {
    wallets = await api.get(`wallet-activities?filter=sellers`)
  }
  if (type === 'royalties') {
    wallets = await api.get(`wallet-activities?filter=royalties`)
  }
  
  return {
    body: wallets
  };
}