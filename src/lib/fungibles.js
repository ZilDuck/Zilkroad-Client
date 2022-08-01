export async function convertWithDecimals (fungibleAddressOrSymbol, sellAmount) {
  const response = await fetch('http://localhost:3050/app/fungibles.json')
  const fungibles = (await response.json().catch((error) => console.log(error))) ?? []
  for (let i = 0; i < fungibles.length; i++) {
    if (
      fungibles[i].fungible_address === fungibleAddressOrSymbol ||
      fungibles[i].fungible_symbol.toLowerCase() === fungibleAddressOrSymbol.toLowerCase()
    ) {
      sellAmount = sellAmount * Math.pow(10, fungibles[i].decimals)
    }
  }
  return sellAmount
}
