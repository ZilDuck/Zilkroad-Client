export const variables = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT ?? process.env.VITE_API_ENDPOINT,
  network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK,
  marketplaceAddress: '0xad43392d1750771e58931801ddc274e5984660b4',
  wZilAddress: '0x864895d52504c388A345eF6cd9C800DBBD0eF92A',
  cdnBaseUrl: import.meta.env.VITE_CDN_BASE_URL ?? process.env.VITE_CDN_BASE_URL,
  taxAmount: 200,
  maxRoyaltyBps: 10000
}
