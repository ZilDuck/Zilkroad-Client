<script lang="ts">
  import Token from '$components/Token.svelte'
  import Swap from '$icons/Swap.svelte'
  import { unwrapZil, wrapZil } from '../zilpay/wzil'
  import {pollTx} from "../zilpay/poll-tx";
  import {toast} from "../store/toast";

  let convertAmount
  let zilToWZil = true

  const zil = {
    name: 'ZIL',
    key: 'Zil'
  }

  const wzil = {
    name: 'wZIL',
    key: 'Wzil'
  }

  let currentTokenType = zil
  let swapTokenType = wzil

  function handleSwap() {
    if (currentTokenType === zil && swapTokenType === wzil) {
      zilToWZil = false
      currentTokenType = wzil
      swapTokenType = zil
    } else {
      zilToWZil = true
      currentTokenType = zil
      swapTokenType = wzil
    }
  }

  async function convert() {
    let convertTransactions = zilToWZil ? await wrapZil(convertAmount) : await unwrapZil(convertAmount)
    if (convertTransactions){
      toast.add({ message: 'Transaction Pending', type: 'info' })
      await pollTx(convertTransactions)
    } else {
      toast.add({ message: 'Transaction Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Convert Finished', type: 'success' })
  }
</script>

<div class="token-swap-container w-full">
  <div class="w-full">
    <p class="mb-5 text-center">
      WZIL is a fungible token which represents native ZIL. Use the swap below to switch between ZIL->WZIL and
      WZIL->ZIL.
    </p>
    <div class="relative">
      <button on:click={handleSwap} class="absolute top-full -mt-[72px] ml-5"><Swap /></button>
      <div
        class="h-16 rounded-t-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px]"
      >
        <div class="flex space-x-2">
          <p class="min-w-[40px]">From</p>
          <Token bind:tokenType={currentTokenType.key} showTokenType={false} />
          <input
            type="number"
            bind:value={convertAmount}
            placeholder="0"
            class="bg-transparent text-white focus:outline-0 w-full"
            min="0"
          />
          <p>{currentTokenType.name}</p>
        </div>
      </div>
      <div
        class="h-16 rounded-b-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px]"
      >
        <div class="flex space-x-2">
          <p class="min-w-[40px]">To</p>
          <Token bind:tokenType={swapTokenType.key} showTokenType={false} />
          <input
            type="number"
            bind:value={convertAmount}
            placeholder="0"
            class="bg-transparent text-white focus:outline-0 w-full "
            min="0"
          />
          <p>{swapTokenType.name}</p>
        </div>
      </div>
    </div>

    <button
      on:click={convert}
      class="bg-white h-16 flex items-center text-zilkroad-text-light p-5 rounded-lg w-full justify-center mt-5"
      >Confirm swap
    </button>
  </div>
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
</style>
