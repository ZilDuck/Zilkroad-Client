export const variables = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT ?? process.env.VITE_API_ENDPOINT,
  network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK,
  marketplaceAddress: import.meta.env.VITE_MARKETPLACE_ADDRESS ?? process.env.VITE_MARKETPLACE_ADDRESS,
  wZilAddress: import.meta.env.VITE_WZIL_ADDRESS ?? process.env.VITE_WZIL_ADDDRESS,
  cdnBaseUrl: import.meta.env.VITE_CDN_BASE_URL ?? process.env.VITE_CDN_BASE_URL,
  maxRoyaltyBps: '10000',
  taxAmount: '200'
}
