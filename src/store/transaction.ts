import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import type { Transaction as ZilTransaction } from '@zilliqa-js/account'

export type TransactionOptions = {
  status: 'success' | 'warning' | 'failed' | 'pending'
  txType: 'UserList' | 'UserEditListingPrice' | 'UserBuy' | 'UserReturn' | 'IncreaseAllowance' | 'Mint' | 'Burn' | 'SetSpender'
  tx?: ZilTransaction
  callback?: () => unknown
  message: string
  nftContract: string
  nftTokenId: string
}

export type Transaction = {
  id: number
  remove: () => void
} & TransactionOptions


const createTransaction = () => {
  const { subscribe, update }: Writable<Transaction[]> = writable([] as Transaction[])

  let count = 0

  const remove = (id: number) => {
    update((transactions) => transactions.filter((transaction) => transaction.id !== id))
  }

  const add = (options: TransactionOptions) => {
    count += 1
    const id = count

    const transaction = {
      ...options,
      tx: options.tx ?? null,
      id,
      remove: () => remove(id)
    }

    update((transactions) => ([...transactions, transaction]))
    return count
  }

  const updateStatus = (id: number, newStatus: TransactionOptions['status']) => {
    update((transactions) => {
      return transactions.map((transaction) => {
        if (transaction.id === id) {
          transaction.status = newStatus
        }
        return transaction
      })
    })
  }
  return { subscribe, add, remove, updateStatus }
}

export const transaction = createTransaction()
