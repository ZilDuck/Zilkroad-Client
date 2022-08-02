<script context="module">
  export async function load({ params, fetch, url }) {
    const { contractId } = params
    const page = url.searchParams.get('page') ?? 1
    const [collection, collectionNfts, metadata] = await Promise.all([
      fetch(`/collections/${contractId}.json`)
        .catch((error) => {
          console.log(error)
        })
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/nfts.json?page=${page}`)
        .catch((error) => {
          console.log(error)
        })
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/metadata.json`)
        .catch((error) => {
          console.log(error)
        })
        .then((r) => r.json())
    ])
    let nfts = collectionNfts.nfts
    let pagination = JSON.parse(collectionNfts.pagination)
    return {
      props: { collection, nfts, pagination, metadata }
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
  import { cdnBaseUrl } from '../../../lib/cdn'
  import { onMount } from "svelte";

  export let collection = {}
  export let nfts = []
  export let pagination = {
    size: 16,
    page: 1,
    total_pages: 0,
    total_elements: 0
  }
  export let metadata = []
  let collection_image_uri 

  export let currentPage = $page.url.searchParams.get('page') ?? 1
  let contractId = $page.params.contractId

  const max_royalty_bps = 10000
  export let royalty_percentage = collection.royalty_bps ? max_royalty_bps / collection.royalty_bps : 0
  export let listed_tokens = collection.stats.listed_tokens
  export let sales_volume = collection.stats.volume

  const image_uri = `${cdnBaseUrl}${collection.contract_address_b16}?optimizer=image&width=650`

  async function handlePageChange(event) {
    const page = event.detail.currentPage
    let collectionNfts = await fetch(`/collections/${contractId}/nfts.json?page=${page}`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    nfts = collectionNfts.nfts
    currentPage = page
  }

  console.log(pagination)
  
  onMount(async () => {
    collection_image_uri = await getContractMetadataImage(collection.contract_address_b16)
  })

  /**
   * Temporary fix as it requires the client to have zilpay extension enabled
   * @param contractAddress
   * @returns {Promise<string>}
   */
  async function getContractMetadataImage(contractAddress) {
    let imageUrl = '';
    const getHostnameFromIpfs = (url) => {
      // run against regex
      const matches = url.match(/^ipfs?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      // extract hostname (will be null if no match is found)
      return matches && matches[1];
    }
    if (window.zilPay && window.zilPay.wallet.isEnable) {
      const contractState = await window.zilPay.contracts.at(contractAddress).getState()
      const baseUri = contractState.base_uri ?? ''
      if (baseUri) {
        const metadata = await fetch(`https://gateway.pinata.cloud/ipfs/${getHostnameFromIpfs(baseUri)}/metadata.json`).then((res) => res.json())
        if (metadata.collection_image_url) {
          imageUrl = metadata.collection_image_url;
        }
      }
    }
    return imageUrl
  }
  
</script>

<ShapeImage />
<div class="flex flex-col h-full mt-40 space-y-5 md:items-center">
  <div class="max-w-screen-xl mx-5 xl:mx-auto xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense w-full">
    {#if collection.verified ?? collection.is_verified}
      <img
        class="w-full max-w-[600px] h-auto rounded-lg lg:col-start-2 ml-auto"
        src={collection_image_uri || image_uri}
        alt="{collection.name ?? collection.contract_name} hero"
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
      <h1 class="mt-5 text-4xl font-medium md:text-5xl">{collection.name ?? collection.contract_name}</h1>

      <p class="pt-5 font-light text-white">
        {collection.description ?? collection.contract_symbol ?? 'No description'}
        {console.log('collection', collection)}
      </p>

      <div>
        <div class="inline-grid grid-flow-col auto-cols-max gap-5 mt-5 rounded-lg bg-zilkroad-gray-dark p-5">
          <Detail description="Items listed" value="{listed_tokens} / {collection.nfts_minted}" border="right" />
          <!-- <Detail
          description='Floor price'
          value='{collection.floor} ZIL'
          border='right'
        /> -->
          <Detail description="Volume" value="${sales_volume}" border="right" />
          <Detail description="Royalty" value="{royalty_percentage}%" />
        </div>
      </div>
    </section>
  </div>
</div>

<main class="max-w-screen-xl mx-auto">
  <h2 class="mt-10 mb-10 text-xl md:col-span-2 lg:col-span-3 xl:col-span-4">
    Showing <span class="text-zilkroad-teal"
      >{pagination.size < pagination.total_elements ? pagination.size : pagination.total_elements}</span
    >
    of <span class="text-zilkroad-teal">{pagination.total_elements}</span> items
  </h2>
  <NftCardList {nfts} />
  <div class="w-full flex justify-center mt-20">
    <Pagination numPages={pagination.total_pages} {currentPage} className="mx-auto" on:pageChange={handlePageChange} />
  </div>
</main>
