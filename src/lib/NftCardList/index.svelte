<script>
  import { session } from '$app/stores'
  import NftCard from './NftCard.svelte'
  export let nfts
  export let cols = 4

  let sizeClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    7: 'md:grid-cols-7',
    8: 'md:grid-cols-8'
  }
</script>

<div class={`grid grid-cols-1 ${sizeClasses[cols]} mt-10 gap-6 w-full`}>
  {#if nfts.length}
    {#each nfts as nft}
      <NftCard {nft} user={$session.user} />
    {/each}
  {/if}
</div>
