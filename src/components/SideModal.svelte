<script lang="ts">
  import { fly } from 'svelte/transition'

  // Icons
  import Cross from '$icons/Cross.svelte'

  export let title: string = 'Sell your NFT'
  export let show: boolean

  function closeModal() {
    show = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }
</script>

{#if show}
  <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-50">
    <div
      transition:fly={{ x: 576 }}
      class="bg-black fixed right-0 top-0 max-w-full w-[576px] h-full z-50 border-l-[1px] border-l-[#292929] overflow-scroll"
    >
      <div class="p-10 flex justify-between items-center w-full pb-0">
        <h2 class="text-white text-[36px] font-[600]">{title}</h2>
        <button
          class="flex items-center justify-center w-8 h-8 text-white bg-zilkroad-gray-dark rounded-lg"
          on:click={closeModal}
        >
          <Cross />
        </button>
      </div>
      <div class="side-modal-content p-10">
        <slot />
      </div>
    </div>
  </div>
{/if}
