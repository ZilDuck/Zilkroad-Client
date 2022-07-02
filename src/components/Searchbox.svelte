<script>
  import SearchResultList from '../lib/SearchResultList/index.svelte'
  import debounce from '$lib/debounce.js'
  import { clickOutside } from '$lib/listeners.js'
  import { fade } from 'svelte/transition'

  export let light = false
  export let className = ''

  let value = ''
  let results = []
  let showSearchResults

  async function search() {
    if (!value) {
      showSearchResults = false
      results.length = 0
      return
    }
    results[0] = await fetch(`/search/${value}/search.json`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())

    if (results) {
      showSearchResults = true
    }
  }

  function hideSearchResults(event) {
    showSearchResults = false
  }

  function reOpenSearch() {
    showSearchResults = true
  }
</script>

<div class="relative flex-1 h-12 z-20" on:click={reOpenSearch}>
  <div
    class="absolute bg-zilkroad-gray-dark rounded-lg w-full h-auto border {showSearchResults
      ? 'border-zilkroad-gray-border'
      : 'border-zilkroad-gray-dark'}"
  >
    <input
      type="text"
      class="w-full rounded-lg p-4 h-12 bg-transparent text-white {className}"
      placeholder="Search"
      bind:value
      use:debounce={{ value, func: search, duration: 500 }}
    />
    {#if showSearchResults}
      <div use:clickOutside on:click_outside={hideSearchResults} transition:fade={{ duration: 200 }}>
        <SearchResultList searchResults={results} />
      </div>
    {/if}
  </div>
</div>
