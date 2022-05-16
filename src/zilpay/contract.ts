import type { TxParams } from '@zilliqa-js/account'
import type { Value } from '@zilliqa-js/contract'
import { BN, Long, bytes } from '@zilliqa-js/util'

const gasLimit = Long.fromString('25000')
const gasPrice = new BN('10000000')

const chainId = 333
const msgVersion = 1
const version = bytes.pack(chainId, msgVersion)

export const contract = (address: string) => {
  const contract = window.zilPay.contracts.at(address)

  return {
    call: async (transition: string, args: Value[], params: Partial<TxParams> = {}) => {
      return contract.call(transition, args, {
        gasLimit,
        gasPrice,
        amount: params.amount || new BN('0'),
        version,
        ...params
      })
    },
    getSubstate: async (variableName: string, indices?: string[]) => {
      const substate = await contract.getSubState(variableName, indices) as undefined | { [key: string]: string } | { [key: string]: { [key: string]: unknown }}
      return !substate
        ? undefined
        : indices.length === 1 && indices[0] && substate[variableName][indices[0]]
          ? substate[variableName][indices[0]] as string
          : substate[variableName]
    }
  }
}
