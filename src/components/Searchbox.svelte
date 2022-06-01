<script>
  export let light = false
  export let className = ''
  
  let query = ''
  let results = ''
  
  async function search() {
    let search = await fetch(`/search/${query}/search.json`).catch(error => {
      console.log(error)
    }).then((r) => r.json())
    results = JSON.stringify(search)
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

  <pre class="absolute top-16 w-52 p-4 bg-amber-50 text-zilkroad-gray-dark text-xs">{results}</pre>

</div>


