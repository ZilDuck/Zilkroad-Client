export const variables = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT ?? process.env.VITE_API_ENDPOINT,
  network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK,
  marketplaceAddress: '0xB4FA69997f7560fe48F375b03F73B8774cB3BF5A',
  wZilAddress: import.meta.env.VITE_WZIL_ADDRESS ?? process.env.VITE_WZIL_ADDRESS,
  cdnBaseUrl: import.meta.env.VITE_CDN_BASE_URL ?? process.env.VITE_CDN_BASE_URL
}
