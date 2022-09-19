<script lang="ts">
  import { fly } from 'svelte/transition'
  import { slide } from 'svelte/transition'
  import Cross from '$icons/Cross.svelte'
  export let show: boolean

  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }

  let recipientAddress = ''
  let receipentAddressValid = true
</script>

{#if show}
  <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center">
    <div transition:slide class="w-[420px] p-5 bg-gray-900 rounded-lg">
      <div class="flex items-center pb-3.5 mb-5 border-gray-800 border-b justify-between">
        <h6 class="font-semibold text-white">Transfer NFT</h6>
        <button class="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg" on:click={closeModal}>
          <Cross />
        </button>
      </div>
      <p class="mb-5">
        You are about to transfer an NFT. Transferring an NFT permanently removes it from your wallet, please ensure
        that the address is correct below. Please enter the address of the wallet you are sending to below.
      </p>
      <div class="mb-5 flex items-center">
        <img src="https://picsum.photos/80/80" alt={`nft.name`} class="rounded-lg" />
        <div class="ml-5">
          <p class="text-white">Nft name here</p>
          <p>Nft collection here</p>
        </div>
      </div>
      <p class="text-white mb-[10px]">NFT recipient address</p>
      <input
        type="text"
        class="w-full bg-[#393939] h-10 px-[10px] text-white rounded-[4px] mb-5"
        bind:value={recipientAddress}
      />
      {#if receipentAddressValid === true}
        <div class="flex justify-between mb-5">
          <p class="text-[#64B886]">Wallet address valid.</p>
          <p class="text-white">120Zil</p>
        </div>
      {/if}
      {#if receipentAddressValid === false}
        <p class="mb-5 text-[#E36A6A]">Wallet address invalid.</p>
      {/if}
      <button
        class="w-full rounded-[4px] h-10 flex items-center justify-center bg-white text-[#989898] disabled:cursor-not-allowed"
        disabled={!recipientAddress && !receipentAddressValid}>Confirm sending NFT to new address</button
      >
    </div>
  </div>
{/if}
