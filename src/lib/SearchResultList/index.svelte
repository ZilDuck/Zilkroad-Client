<script>
  import SearchResult from "./SearchResult.svelte";
  export let searchResults;
</script>

{#each searchResults as searchResult}
  <SearchResult {searchResult} />
{/each}