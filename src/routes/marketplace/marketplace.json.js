import * as api from "../../lib/api.js";

export async function get() {
  
  const marketplace = await api.get(`marketplace`)
  
  return {
    body: {
      nfts: marketplace?.nfts ?? [],
      pagination: marketplace?.pagination,
      collections: marketplace?.collections?? [],
    }
  }
}