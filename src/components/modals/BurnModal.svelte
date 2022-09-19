<script lang="ts">
  import { fly } from 'svelte/transition'
  import { slide } from 'svelte/transition'
  import Cross from '$icons/Cross.svelte'

  export let title: string = 'Sell your NFT'
  export let show: boolean

  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }

  const confirmationString = 'im-burning-this-nft'
  let userConfirmationString = ''
</script>

{#if show}
  <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50 flex justify-center items-center">
    <div transition:slide class="w-[420px] p-5 bg-gray-900 rounded-lg">
      <div class="flex items-center pb-3.5 mb-5 border-gray-800 border-b justify-between">
        <h6 class="font-semibold text-white">{title}</h6>
        <button class="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg" on:click={closeModal}>
          <Cross />
        </button>
      </div>
      <p class="mb-5">
        You are about to burn an NFT. This is irreversible, and cannot be undone. To confirm that you would like to burn
        this NFT, please type <span class="text-white">{confirmationString}</span>.
      </p>
      <input
        type="text"
        class="w-full bg-[#393939] h-10 px-[10px] text-white rounded-[4px] mb-5"
        bind:value={userConfirmationString}
      />
      <button
        class="w-full rounded-[4px] h-10 flex items-center justify-center bg-[#9E3030] text-[#FFE4E4] hover:bg-[#D25B5B] disabled:cursor-not-allowed"
        disabled={userConfirmationString !== confirmationString}>I understand the consequences, delete NFT.</button
      >
    </div>
  </div>
{/if}
