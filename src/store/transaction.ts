import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export type TransactionOptions = {
  type: 'success' | 'warning' | 'failed' | 'pending'
  tx?: object
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

  return { subscribe, add, remove }
}

export const transaction = createTransaction()
