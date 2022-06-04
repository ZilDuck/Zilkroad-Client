export async function get() {
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