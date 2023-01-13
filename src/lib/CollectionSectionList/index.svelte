<script>
  import { session } from '$app/stores'
  import CollectionSection from './CollectionSection.svelte'
  import variables from "../../store/variables";
  export let collections
</script>

{#each collections as collection}
  <CollectionSection {collection} cdnBaseUrl={$variables.cdnBase} user={$session.user} />
{/each}
