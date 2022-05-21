<script context="module">
  export async function load({ params, fetch, url }) {
    const { contractId } = params
    const page = url.searchParams.get('page') ?? 1
    const [collection, collectionNfts] = await Promise.all([
      fetch(`/collections/${contractId}.json`).catch(error => {
        console.log(error)
      }).then((r) => r.json()),
      fetch(`/collections/${contractId}/nfts.json?page=${page}`).catch(error => {
        console.log(error)
      }).then((r) => r.json())
    ])
    let nfts = collectionNfts.nfts
    let pagination = JSON.parse(collectionNfts.pagination)
    return {
      props: { collection, nfts, pagination }
    }
  }
</script>

<script>
  import Header from '$components/Header.svelte'
  import Detail from '$components/Detail.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import Checkmark from '$components/icons/Checkmark.svelte'
  import NftCardList from '../../../lib/NftCardList/index.svelte'
  import Pagination from '../../../components/Pagination.svelte'
  import { page } from '$app/stores'

  export let collection = {}
  export let nfts = []
  export let pagination = {
    size: 16,
    page: 1,
    total_pages: 0,
    total_elements: 0
  }
  export let currentPage = $page.url.searchParams.get('page') ?? 1
  let contractId = $page.params.contractId

  async function handlePageChange(event) {
    const page = event.detail.currentPage
    let collectionNfts = await fetch(`/collections/${contractId}/nfts.json?page=${page}`).catch(error => {
      console.log(error)
    }).then((r) => r.json())
    nfts = collectionNfts.nfts
    currentPage = page
  }

  console.log(pagination)
</script>

<ShapeImage />
<div class="flex flex-col h-full mt-40 space-y-5 md:items-center">
  <div
    class="max-w-screen-xl mx-5 xl:mx-auto xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense"
  >
    {#if collection.verified ?? collection.is_verified}
      <img
        class='w-full h-auto rounded-lg lg:col-start-2'
        src='https://i.pickadummy.com/600x420?cache={collection.id ?? collection.contract_address_b32}'
        alt='{collection.name ?? collection.contract_name} hero'
        width='400'
        height='300'
      />
    {/if}
    <section class="mr-5 lg:col-start-1">
      <div class="flex mt-10 lg:mt-0">
        <h3 class="mr-5 break-all text-zilkroad-teal">
          <!-- TODO: Change to bech32 -->
          {collection.id ?? collection.contract_address_b32}
        </h3>

        {#if collection.verified ?? collection.is_verified}
          <h4 class="flex items-center">
            <Checkmark className="mr-2" />
            Verified
          </h4>
        {/if}
      </div>
      <h1 class='mt-5 text-4xl font-medium md:text-5xl'>{collection.name ?? collection.contract_name}</h1>

      <p class="pt-5 font-light text-white">
        {collection.description ?? collection.contract_symbol ?? 'No description'}
      </p>

      <div>
        <div
        class='grid grid-flow-col auto-cols-max gap-5 mt-5 rounded-lg bg-zilkroad-gray-dark p-5'
      >
        <Detail description='Items listed'
                value='{nfts.length ?? collection.sales_history[0].sitewide_listed} / {collection.nfts_minted}'
                border='right' />
        <Detail
          description='Floor price'
          value='{collection.floor} ZIL'
          border='right'
        />
        <Detail
          description='Volume'
          value='{collection.volume} ZIL'
          border='right'
        />
        <Detail description='Royalty' value='{collection.royalty_bps}' />
      </div>
      </div>
    </section>
  </div>
</div>

<main
  class='max-w-screen-xl mx-auto'
>
  <h2 class='mt-10 mb-10 text-xl md:col-span-2 lg:col-span-3 xl:col-span-4'>
    Showing <span
    class='text-zilkroad-teal'>{pagination.size < pagination.total_elements ? pagination.size : pagination.total_elements}</span>
    of <span
    class='text-zilkroad-teal'>{pagination.total_elements}</span> items
  </h2>
  <div
    class='flex flex-col mx-5 mt-5 space-y-12 xl:mx-auto md:grid md:grid-cols-2 md:space-y-0 md:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
    <NftCardList {nfts} />
  </div>
  <Pagination numPages={pagination.total_pages} currentPage={currentPage}
              className='mx-auto'
              on:pageChange={handlePageChange} />
</main>
