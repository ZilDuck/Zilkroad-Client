export function convertWithDecimals (approvedFungibles, fungibleAddressOrSymbol, sellAmount, reverse = false) {
  for (let i = 0; i < approvedFungibles.length; i++) {
    if (
      approvedFungibles[i].fungible_address === fungibleAddressOrSymbol ||
      approvedFungibles[i].fungible_symbol.toLowerCase() === fungibleAddressOrSymbol.toLowerCase()
    ) {
      if (reverse) {
        sellAmount = sellAmount / Math.pow(10, approvedFungibles[i].decimals)
        sellAmount = sellAmount.toFixed(approvedFungibles[i].decimals)
      } else {
        sellAmount = sellAmount * Math.pow(10, approvedFungibles[i].decimals)
      }
    }
  }
  return sellAmount
}
