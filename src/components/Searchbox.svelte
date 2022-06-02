<script>
  import SearchResultList from '../lib/SearchResultList/index.svelte'
  import SearchResult from '../lib/SearchResultList/SearchResult.svelte'
  import debounce from '$lib/debounce.js'

  export let light = false
  export let className = ''

  let value = ''
  let results = []

  async function search() {
    let search = await fetch(`/search/${value}/search.json`)
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
    bind:value
    use:debounce={{ value, func: search, duration: 500 }}
  />
  <button class="text-zilkroad-teal" on:click={search}>Search</button>
  {#if results}
    <SearchResultList searchResults={results} />
  {/if}
</div>
