<script>
  import SearchResultList from '../lib/SearchResultList/index.svelte'
  import SearchResult from '../lib/SearchResultList/SearchResult.svelte'

  export let light = false
  export let className = ''

  let query = ''
  let results = []

  async function search() {
    let search = await fetch(`/search/${query}/search.json`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    results[0] = search
  }
</script>

<div class="relative">
  <input
    type="text"
    class="w-full md:w-60 h-12 rounded-lg p-4 bg-zilkroad-gray-dark text-white {className}"
    placeholder="Search"
    bind:value={query}
  />
  <button class="text-zilkroad-teal" on:click={search}>Search</button>
  {#if results}
    {@debug results}
    <SearchResultList searchResults={results} />
  {/if}
</div>
