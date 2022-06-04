<script context="module">
  export async function load({ url, fetch }) {
    const page = url.searchParams.get('page') ?? 1
    const filter = url.searchParams.get('filter') ?? ''
    const order = url.searchParams.get('order') ?? 'ASC'

    const marketplace = await fetch(`/marketplace/marketplace.json?page=${page}&filter=${filter}&order=${order}`).then((r) => r.json())
    
    return {
      props: {
        nfts: marketplace?.nfts,
        collections: marketplace?.collections
      }
    }
  }
</script>

<script>
  import Select from 'svelte-select'
  import NftCardList from '$lib/NftCardList/index.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import ScrollableSection from '$components/ScrollableSection.svelte'

  export let nfts = []
  export let collections = []

  let items = [
    { value: 'ascending', label: 'Sort by asc' },
    { value: 'descending', label: 'Sort by desc' }
  ]

  let value = items[1]

  function handleSelect(event) {
    console.log('selected item', event.detail)
  }

  function handleOrder(event) {
    console.log('selected item', event.detail)
    value = event.detail
  }
</script>

<ShapeImage />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40">
  <h1
    class="text-4xl sm:text-5xl leading-relaxed md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]"
  >
    The marketplace
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white">View nfts available on the marketplace now.</p>
</div>

<div class=" mx-5">
  <div class="mx-auto max-w-screen-xl mt-20">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-xl font-medium md:col-span-2 lg:col-span-3 xl:col-span-4">
        Showing <span class="text-zilkroad-teal">22</span> items
      </h3>
      <div class="flex">
        <div class="select-field min-w-[300px] mr-5">
          <Select
            items={collections}
            placeholder="Filter by collection"
            containerClasses="bg-zilkroad-gray-dark"
            on:select={handleSelect}
          />
        </div>
        <div class="select-field min-w-[300px]">
          <Select
            {items}
            {value}
            isClearable={false}
            isSearchable={false}
            containerClasses="bg-zilkroad-gray-dark"
            on:select={handleOrder}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<section
  class="flex flex-col items-start max-w-screen-xl px-5 mt-10 space-y-10 xl:mx-auto xl:px-0 md:mt-20 md:grid md:grid-cols-2 md:space-y-0 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
>
  <ScrollableSection className="md:grid-cols-4">
    <NftCardList nfts={nfts} />
  </ScrollableSection>
</section>

<style>
  .select-field {
    --border: 1px solid #656565;
    --borderRadius: 8px;
    --background: #000;
    --height: 48px;

    --inputColor: #fff;
    --inputFontSize: 16px;

    --listBackground: #000;
    --listBorder: 1px solid #656565;
    --listBorderRadius: 8px;
    --listEmptyPadding: 12px;

    --itemColor: #fff;
    --itemHoverBG: #1a1a1a;
    --itemHoverColor: #fff;
    --itemIsActiveColor: #fff;

    --placeholderColor: #cbcbcb;

    --multiItemActiveColor: #fff;

    background: url('data:image/gif;base64,PHN2ZyB3aWR0aD0iNyIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgNyA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMy41IDVMMC40Njg5MTEgMC41TDYuNTMxMDkgMC41TDMuNSA1WiIgZmlsbD0iI0M0QzRDNCIvPgo8L3N2Zz4K');
  }
</style>
