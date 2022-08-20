import { contract } from './contract'
import { variables } from '../lib/variables.js'

export const { wZilAddress } = variables

export const wrapZil = async (amount: number) => {
  const { call } = contract(wZilAddress)
  return call('Mint', [], {
    amount: new window.zilPay.utils.BN(amount)
  }).catch((error) => console.log(error))
}

export const unwrapZil = async (amount: number) => {
  const { call } = contract(wZilAddress)
  return await call('Burn', [
    {
      vname: 'amount',
      value: amount.toString(),
      type: 'Uint128'
    }
  ]).catch((error) => console.log(error))
}
