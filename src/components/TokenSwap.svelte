<script lang="ts">
  import Token from '$components/Token.svelte'
</script>

<div class="token-swap-container w-full">
  <div class="w-full flex flex-col">
    <!-- <div class="max-w-full">
      <label for="token-swap-amount">Zil</label>
      <input
        type="number"
        value="0"
        id="token-swap-amount"
        class="flex text-4xl w-full max-w-full bg-transparent text-white justify-center text-center"
      />
      <p class="text-4xl text-white">Zil</p>
    </div> -->
    <p class="mb-5 text-center">
      WZIL is a fungible token which represents native ZIL. Use the
      swap below to switch between ZIL->WZIL and WZIL->ZIL.
    </p>
    <button
      class="flex h-16 rounded-t-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px] relative"
    >
      <span class="min-w-[40px] text-left mr-5">From</span>
      <Token tokenType="Wzil" />
      <div
        class="inline-flex ml-[10px] after:content-['WZIL'] after:absolute after:right-5 after:text-white"
      >
        <input
          type="number"
          value="0"
          id="token-swap-amount"
          class="bg-transparent text-white focus:outline-0"
        />
      </div>
    </button>
    <button
      class="flex h-16 rounded-b-lg bg-transparent border-solid border-zilkroad-gray-border items-center p-5 border-[1px] relative"
    >
      <span class="min-w-[40px] text-left mr-5">To</span>
      <Token tokenType="Zil" />
      <div
        class="inline-flex ml-[10px]  after:content-['ZIL'] after:absolute after:right-5 after:text-white"
      >
        <input
          type="number"
          value="0"
          id="token-swap-amount"
          class="bg-transparent text-white focus:outline-0"
        />
      </div>
    </button>
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
