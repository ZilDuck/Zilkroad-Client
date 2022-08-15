import type { TxParams } from '@zilliqa-js/account'
import { contract } from './contract'
import { marketplaceAddress } from './marketplace'

export const increaseAllowance = async (
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
        value: String('amount'),
        type: 'Uint128'
      }
    ],
    params
  )
}
