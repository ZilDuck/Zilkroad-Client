export const variables = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT ?? process.env.VITE_API_ENDPOINT,
  network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK,
  marketplaceAddress: '0x552f96a968cac7a910fdeb668181b0f6e50e4fae',
  wZilAddress: import.meta.env.VITE_WZIL_ADDRESS ?? process.env.VITE_WZIL_ADDRESS,
  cdnBaseUrl: import.meta.env.VITE_CDN_BASE_URL ?? process.env.VITE_CDN_BASE_URL
}
