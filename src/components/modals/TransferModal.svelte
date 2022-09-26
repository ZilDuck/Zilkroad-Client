<script lang="ts">
  import { slide } from 'svelte/transition'
  import Cross from '$icons/Cross.svelte'
  import { toast } from "../../store/toast";
  import marketplace from "$store/marketplace";
  import { pollTx } from "../../zilpay/poll-tx";
  export let show: boolean
  export let nftName = ''
  export let nftCollectionName = ''
  export let nftImage = 'https://picsum.photos/80/80'
  export let nftContract = ''
  export let nftTokenId = ''
  
  async function transfer() {
    let { transferTx } = await marketplace.transferNft(nftContract, recipientAddress, nftTokenId)
    if (transferTx) {
      toast.add({ message: 'Transferring NFT', type: 'info' })
      await pollTx(transferTx)
    } else {
      toast.add({ message: 'Transfer Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Transfer Confirmed', type: 'success' })
  }
  
  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }
  
  function isAddressValid() {
    receipentAddressValid = recipientAddress.length > 10; 
  }
  
  let recipientAddress = ''
  let receipentAddressValid = false
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
        <img src={nftImage} alt={`nft.name`} class="rounded-lg w-20" />
        <div class="ml-5">
          <p class="text-white">{nftName}</p>
          <p>{nftCollectionName}</p>
        </div>
      </div>
      <p class="text-white mb-[10px]">NFT recipient address</p>
      <input
        type="text"
        class="w-full bg-[#393939] h-10 px-[10px] text-white rounded-[4px] mb-5"
        bind:value={recipientAddress}
        on:input={isAddressValid}
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
        disabled={!recipientAddress && !receipentAddressValid} on:click={transfer}>Confirm sending NFT to new address</button
      >
    </div>
  </div>
{/if}
