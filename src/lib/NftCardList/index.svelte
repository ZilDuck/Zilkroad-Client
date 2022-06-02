<script>
  import { session } from '$app/stores';
  import NftCard from "./NftCard.svelte";
  export let nfts;
</script>

{#if nfts.length }
  {#each nfts as nft}
    <NftCard {nft} user={$session.user} />
  {/each}
{/if}

