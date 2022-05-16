<script>
  import WalletCard from './WalletCard.svelte'

  export let wallets
</script>

<div class="grid grid-cols-4 gap-5">
  {#each wallets as wallet}
    <WalletCard />
  {/each}
  <WalletCard />
  <WalletCard />
  <WalletCard />
  <WalletCard />
</div>
