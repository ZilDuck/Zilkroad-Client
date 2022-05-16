<script>
  import { session } from '$app/stores';
  import CollectionCard from "./CollectionCard.svelte";
  export let collections;
</script>

{#each collections as collection}
  <CollectionCard {collection} user={$session.user} />
{/each}

