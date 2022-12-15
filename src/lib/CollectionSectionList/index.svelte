<script>
  import { session } from '$app/stores'
  import CollectionSection from './CollectionSection.svelte'
  import marketplace from "../../store/marketplace";
  export let collections
</script>

{#each collections as collection}
  <CollectionSection {collection} cdnBaseUrl={$marketplace.appVariables.cdnBase} user={$session.user} />
{/each}
