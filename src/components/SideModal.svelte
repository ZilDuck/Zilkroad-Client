<script lang="ts">
  import { onMount } from 'svelte'
  import Token from '$components/Token.svelte'
  import ViewWallet from '$icons/ViewWallet.svelte'
  import DisconnectWallet from '$icons/DisconnectWallet.svelte'
  import wallet from '$store/wallet'
  import TokenSwap from '$components/TokenSwap.svelte'

  // Icons
  import Cross from './icons/Cross.svelte'

  export let title: string = 'Sell your NFT'
  export let show: boolean



  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }
</script>

{#if show}
  <div class='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50'>
    <div class='bg-black fixed right-0 top-0 w-[576px] h-full z-50 border-l-[1px] border-l-[#292929] overflow-scroll'>
      <div class='p-5 flex justify-between items-center w-full'>
        <h2 class='text-white text-[36px] font-[600]'>{title}</h2>
        <button
          class='flex items-center justify-center w-8 h-8 text-white bg-zilkroad-gray-dark rounded-lg'
          on:click={closeModal}>
          <Cross />
        </button
        >
      </div>
      <div class='side-modal-content p-5'>
        <slot />
      </div>
    </div>
  </div>
{/if}
