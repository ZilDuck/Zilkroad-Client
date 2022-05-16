<script>
  import { session } from '$app/stores'
  import CollectionSection from './CollectionSection.svelte'
  export let collections
</script>

{#each collections as collection}
  <CollectionSection {collection} user={$session.user} />
{/each}
