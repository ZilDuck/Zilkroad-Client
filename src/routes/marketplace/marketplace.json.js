import * as api from "../../lib/api.js";

export async function get() {
  
  const marketplace = await api.get(`marketplace`)
  
  return {
    body: {
      nfts: [],
      collections: [
        { value: 'ducks', label: 'Ducks' },
        { value: 'beanTerra', label: 'Beanterra' },
        { value: 'bears', label: 'Bears' }
      ]
    }
  }
}