import type { Transaction } from '@zilliqa-js/account'

export const pollTx = async (tx: Transaction) => new Promise((resolve, reject) => {
  const interval = setInterval(async () => {
    const status = await window.zilPay.blockchain.getTransactionStatus('0x' + tx.ID)
    if (status.result.status === 3 && status.result.success === true) {
      clearInterval(interval)
      resolve(true)
    }
    if (status.result.status >= 10 || (status.result.status === 3 && status.result.success === false)) {
      const failedTx = await window.zilPay.blockchain.getTransaction('0x' + tx.ID)
      clearInterval(interval)
      reject(failedTx)
    }
  }, 5000)
})
