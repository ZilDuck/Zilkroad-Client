import type { TxParams } from '@zilliqa-js/account'
import { contract } from './contract'

export const increaseAllowance = async (
  marketplaceAddress: string,
  fungibleContract: string,
  amount: string,
  params: Partial<TxParams> = {}
) => {
  return await contract(fungibleContract).call(
    'IncreaseAllowance',
    [
      {
        vname: 'spender',
        value: marketplaceAddress,
        type: 'ByStr20'
      },
      {
        vname: 'amount',
        value: String(amount),
        type: 'Uint128'
      }
    ],
    params
  )
}
