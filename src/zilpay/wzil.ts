import { contract } from './contract'
export const wrapZil = async (amount: number, wZilAddress) => {
  const { call } = contract(wZilAddress)
  return call('Mint', [], {
    amount: new window.zilPay.utils.BN(amount)
  }).catch((error) => console.log(error))
}

export const unwrapZil = async (amount: number, wZilAddress) => {
  const { call } = contract(wZilAddress)
  return await call('Burn', [
    {
      vname: 'amount',
      value: amount.toString(),
      type: 'Uint128'
    }
  ]).catch((error) => console.log(error))
}
