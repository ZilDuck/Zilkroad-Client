<script context="module">
  export async function load({ url, fetch }) {
    const page = url.searchParams.get('page') ?? 1
    const filter = url.searchParams.get('filter') ?? 'recently-listed'
    const order = url.searchParams.get('order') ?? 'ASC'

    const marketplace = await fetch(`/marketplace/marketplace.json?page=${page}&filter=${filter}&order=${order}`).then(
      (r) => r.json()
    )
    return {
      props: {
        nfts: marketplace?.nfts,
        pagination: marketplace?.pagination,
        collections: marketplace?.collections
      }
    }
  }
</script>

<script>
  import SvelteSeo from "svelte-seo";
  import Select from 'svelte-select'
  import NftCardList from '$lib/NftCardList/index.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import PageHeader from '$components/PageHeader.svelte'
  import Pagination from '../../components/Pagination.svelte'
  import { page } from '$app/stores'
  import AdBanner from '../../components/AdBanner.svelte'

  export let nfts = []
  export let collections = []

  export let currentPage = $page.url.searchParams.get('page') ?? 1
  export let pagination = {
    size: 16,
    page: 1,
    total_pages: 0,
    total_elements: 0
  }

  let items = [
    { value: 'ascending', label: 'Sort by asc' },
    { value: 'descending', label: 'Sort by desc' }
  ]

  let value = items[1]
  let filter
  let selectedCollection

  async function handleSelect(event) {
    selectedCollection = event.detail.value
    filter = 'contract-listed'
    let collectionNfts = await fetch(`/marketplace/marketplace.json?filter=${filter}&collection=${selectedCollection}`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    nfts = collectionNfts.nfts
  }

  function handleOrder(event) {
    value = event.detail
  }

  async function handlePageChange(event) {
    const page = event.detail.currentPage
    let collectionNfts = await fetch(
      `/marketplace/marketplace.json?page=${page}?filter=${filter}&collection=${selectedCollection}`
    )
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    nfts = collectionNfts.nfts
    currentPage = page
  }
</script>
<SvelteSeo
  title="Zilkroad : Marketplace"
  description="All of the currently listed tokens available"
  twitter={{
    site: "@zilkroad_dex",
    title: "Zilkroad NFT Marketplace",
    description: "Buy, sell and trade Zilliqa NFTs",
    image: "https://staging.zilkroad.io/images/og-image.jpg", // replace me
    imageAlt: "Zilkroad NFT Marketplace",
  }}
  openGraph={{
    title: 'Zilkroad : Marketplace',
    description: "All of the currently listed tokens available",
    url: 'https:/zilkroad.io',
    type: 'website',
    images: [
      {
        url: 'https://staging.zilkroad.io/images/og-image.jpg', // replace me
        width: 909,
        height: 90,
        alt: 'Zilkroad NFT Marketplace',
      }
     ]
  }}
/>

<ShapeImage />
<PageHeader title="The marketplace" description="View nfts available on the marketplace now." />

<div class=" mx-5">
  <div class="mx-auto max-w-screen-xl mt-20">
    <div class="flex flex-col md:flex-row justify-between md:items-center w-full mb-5">
      <h3 class="text-xl font-medium md:col-span-2 lg:col-span-3 xl:col-span-4 mb-5 md:mb-0">
        Showing <span class="text-zilkroad-teal"
          >{pagination.size < pagination.total_elements ? pagination.size : pagination.total_elements}</span
        >
        of <span class="text-zilkroad-teal">{pagination.total_elements}</span> items
      </h3>
      <div class="flex flex-col md:flex-row gap-5">
        <div class="select-field min-w-[300px] md:mr-5">
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

<main class="max-w-screen-xl mx-auto">
  <div class="flex flex-col mx-5 space-y-12 xl:mx-auto md:space-y-0 md:gap-6 mb-[120px]">
    <NftCardList {nfts} />
  </div>
  <Pagination numPages={pagination.total_pages} {currentPage} className="mx-auto" on:pageChange={handlePageChange} />
  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>

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
