/**
 * process.env should be what gets set during runtime in node on remote server.
 * import.meta.env should be what is available in the .env file for local dev.
 * 
 * @returns {Promise<{body: {network: (*|string|boolean)}}>}
 */
export async function get() {
  return {
    body: {
      network: import.meta.env.VITE_BLOCK_NETWORK ?? process.env.VITE_BLOCK_NETWORK
    } 
  }
}