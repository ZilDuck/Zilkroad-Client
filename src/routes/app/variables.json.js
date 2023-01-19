/**
 * process.env should be what gets set during runtime in node on remote server.
 * import.meta.env should be what is available in the .env file for local dev.
 * 
 * @returns {Promise<{body: {network: (*|string|boolean)}}>}
 */
export async function get() {
  return {
    body: {
      network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK,
      nftMarketplaceAddress: import.meta.env.VITE_MARKETPLACE_ADDRESS ?? process.env.VITE_MARKETPLACE_ADDRESS,
      wzilAddress: import.meta.env.VITE_WZIL_ADDRESS ?? process.env.VITE_WZIL_ADDRESS,
      cdnBase: import.meta.env.VITE_CDN_BASE_URL ?? process.env.VITE_CDN_BASE_URL,
      taxAmount: import.meta.env.VITE_TAX_AMOUNT ?? process.env.VITE_TAX_AMOUNT,
      maxRoyaltyBps: import.meta.env.VITE_MAX_ROYALTY_BPS ?? process.env.VITE_MAX_ROYALTY_BPS,
      docsURL: import.meta.env.VITE_DOCS_URL ?? process.env.VITE_DOCS_URL
    } 
  }
}