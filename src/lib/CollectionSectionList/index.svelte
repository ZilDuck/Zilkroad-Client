<script>
  import { session } from '$app/stores'
  import CollectionSection from './CollectionSection.svelte'
  import { cdnBaseUrl } from '../../lib/cdn'
  export let collections
</script>

{#each collections as collection}
  <CollectionSection {collection} cdnBaseUrl={cdnBaseUrl} user={$session.user} />
{/each}
