<script lang="ts">

  import type { Transaction } from '$store/transaction'
  import variables from "$store/variables";

  export let item: Transaction

  const viewblockURL = 'https://viewblock.io/zilliqa/tx'

  function close() {
    item.remove()
    item.callback && item.callback()
  }
  
</script>

<div
  class="w-full min-h-[2.5rem] p-0 flex relative rounded-lg shadow-md overflow-hidden items-center will-change-transform bg-gray-900"
>
  <div class="w-5 px-2 mr-4 min-h-[5.5rem] {item.status}">
    
  </div>
  <div class="text-white">
    <h6 class="capitalize">{@html item.status}</h6>
    {@html item.message}
    <p><a target="_blank" href="{viewblockURL}/0x{item.tx.ID}?network={$variables.network}">View on viewblock</a></p>
  </div>
  {#if item.type === 'success' || item.type === 'failed'}
    <div
      class="self-start pt-2 pr-2 text-white"
      role="button"
      tabindex="-1"
      on:click={close}
    >
      <div class="bg-black p-2.5 py-1 rounded-lg">✕</div>
    </div>
  {/if}
</div>

<style type="text/scss">
  .success {
    background-color: #64b886;
  }

  .failed {
    background-color: #d87070;
  }

  .warning {
    background-color: #d8a270;
  }

  .pending {
    background-color: #709ad8;
  }
</style>
