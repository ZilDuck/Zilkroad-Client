<script>
  import SearchResult from './SearchResult.svelte'
  export let searchResults
</script>

{#each searchResults as searchResult}
  <div class="py-5 mx-5 border-t border-zilkroad-gray-border">
    <SearchResult {searchResult} />
  </div>
{/each}
