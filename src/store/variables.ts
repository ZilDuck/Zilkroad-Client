import { zilkroad } from '../apis/zilkroad'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

type NetworkValues = {
  network: string;
  nftMarketplaceAddress: string;
  wzilAddress: string;
  cdnBase: string;
  taxAmount: number;
  maxRoyaltyBps: number;
  docsUrl: string;
}

const createNetworkValuesStore = () => {
  const { subscribe, update }:Writable<NetworkValues> = writable({
    network: '',
    nftMarketplaceAddress: '',
    wzilAddress: '',
    cdnBase: '',
    taxAmount: 0,
    maxRoyaltyBps: 0,
    docsUrl: ''
  })

  const fetchNetworkValues = async () => {
    const api = zilkroad(fetch)
    api.getAppVariables().then((appVariables) => {
      update(() => (appVariables))
    })
  }

  const networkValuesStore = {
    subscribe,
    fetchNetworkValues
  }

  fetchNetworkValues()

  return networkValuesStore
}

export default createNetworkValuesStore()
