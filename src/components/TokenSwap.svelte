<script lang="ts">
  import Token from '$components/Token.svelte'
  import Swap from '$icons/Swap.svelte'

  const zil = {
    name: 'ZIL',
    key: 'Zil',
  }

  const wzil = {
    name: 'WZIL',
    key: 'Wzil',
  }

  let currentTokenType = zil;
  let swapTokenType = wzil;

  function handleSwap() {
    if (currentTokenType === zil && swapTokenType === wzil) {
      currentTokenType = wzil
      swapTokenType = zil
    } else {
      currentTokenType = zil;
      swapTokenType = wzil;
    }

    console.log('currentTokenType', currentTokenType, 'swapTokenType', swapTokenType)
  }
  
</script>

<div class="token-swap-container w-full">
  <div class="w-full flex flex-col">
    <p class="mb-5 text-center">
      WZIL is a fungible token which represents native ZIL. Use the
      swap below to switch between ZIL->WZIL and WZIL->ZIL.
    </p>
    <div
      class="flex h-16 rounded-t-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px] relative"
    >
      <span class="min-w-[40px] text-left mr-5">From</span>
      <Token bind:tokenType={currentTokenType.key} />
      <div
        class="current-token inline-flex ml-[10px] relative flex-grow"
      >
        <input
          type="number"
          value="0"
          id="token-swap-amount"
          class="bg-transparent text-white focus:outline-0"
        />
        <p class="absolute right-0">{currentTokenType.name}</p>
      </div>
      <button on:click={handleSwap} class="absolute top-full mt-[-8px] z-[1]"><Swap /></button>
    </div>
    <div
      class="flex h-16 rounded-b-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px] relative"
    >
      <span class="min-w-[40px] text-left mr-5">To</span>
      <Token bind:tokenType={swapTokenType.key} />
      <div
        class="swap-token inline-flex ml-[10px] relative flex-grow"
      >
        <input
          type="number"
          value="0"
          id="token-swap-amount"
          class="bg-transparent text-white focus:outline-0"
        />
        <p class="absolute right-0">{swapTokenType.name}</p>
      </div>
    </div>
    <button
      class="bg-white h-16 flex items-center text-zilkroad-text-light p-5 rounded-lg w-full justify-center mt-5"
      >Confirm swap</button
    >
  </div>
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
