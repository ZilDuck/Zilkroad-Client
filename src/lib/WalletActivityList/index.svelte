<script>
  import WalletCard from './WalletCard.svelte'

  export let wallets
</script>

<div class="grid grid-cols-4 gap-5">
  {#each wallets as wallet}
    <WalletCard wallet={wallet}/>
  {/each}
</div>
