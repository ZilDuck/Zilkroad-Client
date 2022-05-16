<script>
  import { session } from '$app/stores'
  import MintFftCard from './MintNftCard.svelte'

  export let collections
</script>

{#each collections as collection}
  <MintFftCard {collection} user={$session.user} />
{/each}
