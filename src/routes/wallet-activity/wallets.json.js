import topBuyingWallets from '../../json/wallet-activity/buyers.json'
import topSellingWallets from '../../json/wallet-activity/sellers.json'
import topRoyaltyWallets from '../../json/wallet-activity/royalties.json'


export async function get({ url: { searchParams } }) {
  let type = searchParams.get('type')
  let wallets = [];

  if (type === 'buyers') {
    wallets = topBuyingWallets // replace with api call
  }
  if (type === 'sellers') {
    wallets = topSellingWallets // replace with api call
  }
  if (type === 'royalties') {
    wallets = topRoyaltyWallets // replace with api call
  }
  
  return {
    body: wallets
  };
}