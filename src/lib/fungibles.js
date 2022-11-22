import Big from 'big.js'

export function convertWithDecimals (approvedFungibles, fungibleAddressOrSymbol, sellAmount, reverse = false) {
  if (!Number(sellAmount)) {
    return '0'
  }
  for (let i = 0; i < approvedFungibles.length; i++) {
    if (
      approvedFungibles[i].fungible_address === fungibleAddressOrSymbol ||
      approvedFungibles[i].fungible_symbol.toLowerCase() === fungibleAddressOrSymbol.toString().toLowerCase()
    ) {
      if (reverse) {
        sellAmount = convertToPounds(sellAmount, approvedFungibles[i].decimals)
      } else {
        sellAmount = convertToPennies(sellAmount, Number(approvedFungibles[i].decimals))
      }
    }
  }
  return sellAmount.toString()
}

function convertToPennies (amount, decimals = 0) {
  return new Big(Number(amount)).mul(new Big(10).pow(Number(decimals))).toString()
}

function convertToPounds (amount, decimals = 0) {
  return new Big(Number(amount)).div(new Big(10).pow(Number(decimals))).toFixed()
}
