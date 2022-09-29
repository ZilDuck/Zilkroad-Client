<script lang="ts">
  import { slide } from 'svelte/transition'
  import Cross from '$icons/Cross.svelte'
  import marketplace from "$store/marketplace";
  import { toast } from "../../store/toast";
  import { pollTx } from "../../zilpay/poll-tx";
  
  export let title: string = 'Burn your NFT'
  export let show: boolean
  
  export let nftContract = ''
  export let nftTokenId = ''

  async function burn() {
    let { burnTx } = await marketplace.burnNft(nftContract, nftTokenId)
    if (burnTx) {
      toast.add({ message: 'Burning NFT', type: 'info' })
      await pollTx(burnTx)
    } else {
      toast.add({ message: 'Burn Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Burn Confirmed', type: 'success' })
  }

  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }
  
  function validateInput() {
    if (userConfirmationString.length > 1) {
      errorMessage = ''
    }
    if (userConfirmationString === confirmationString.toLowerCase()) {
      errorMessage = 'Input is case sensitive'
    }
  }
  
  function stopPaste(event) {
    event.preventDefault()
    errorMessage = 'No pasting'
  }

  const confirmationString = 'Delete this NFT'
  let userConfirmationString = ''
  let errorMessage = ''
</script>

{#if show}
  <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center">
    <div transition:slide class="w-[420px] p-5 bg-gray-900 rounded-lg space-y-5">
      <div class="flex items-center pb-3.5 border-gray-800 border-b justify-between">
        <h6 class="font-semibold text-white">{title}</h6>
        <button class="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg" on:click={closeModal}>
          <Cross />
        </button>
      </div>
      <p>
        You are about to burn an NFT. This is irreversible, and cannot be undone. To confirm that you would like to burn
        this NFT, please type <span class="text-white">{confirmationString}</span>.
      </p>
      <input
        type="text"
        class="w-full bg-[#393939] h-10 px-[10px] text-white rounded-[4px]"
        bind:value={userConfirmationString}
        on:input={validateInput}
        on:paste={(event) => stopPaste(event)}
      />
      {#if (errorMessage)}
      <p transition:slide class="text-red-400 text-center">{errorMessage}</p>
      {/if}
      <button
        class="w-full rounded-[4px] h-10 flex items-center justify-center bg-[#9E3030] text-[#FFE4E4] hover:bg-[#D25B5B] disabled:cursor-not-allowed"
        disabled={userConfirmationString !== confirmationString} on:click={burn}>I understand the consequences, delete NFT.</button
      >
    </div>
  </div>
{/if}
