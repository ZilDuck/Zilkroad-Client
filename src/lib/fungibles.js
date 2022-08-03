export function convertWithDecimals (approvedFungibles, fungibleAddressOrSymbol, sellAmount) {
  for (let i = 0; i < approvedFungibles.length; i++) {
    if (
      approvedFungibles[i].fungible_address === fungibleAddressOrSymbol ||
      approvedFungibles[i].fungible_symbol.toLowerCase() === fungibleAddressOrSymbol.toLowerCase()
    ) {
      sellAmount = sellAmount * Math.pow(10, approvedFungibles[i].decimals)
    }
  }
  return sellAmount
}
