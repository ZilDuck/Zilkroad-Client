<script context="module">
  import { isAddress, isBech32, toBech32Address } from "../../../zilpay/util";

  export async function load({ params, fetch, url }) {
    const { contractId } = params

    //404 invalid addresses
    if (isAddress(contractId) === false && isBech32(contractId) === false) {
      return {
        status: 404,
        error: new Error(`Not Found`)
      }
    }

    //Redirect base16 (0x) addresses
    if (isBech32(contractId) === false) {
      return {
        status: 302,
        redirect: toBech32Address(contractId)
      }
    }
    
    const page = url.searchParams.get('page') ?? 1
    const [collection, collectionNfts, metadata, activity_data] = await Promise.all([
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
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/activity.json`)
        .catch((error) => {
          console.log(error)
        })
        .then((r) => r.json())
    ])
    let nfts = collectionNfts.nfts
    let pagination = JSON.parse(collectionNfts.pagination)
    return {
      props: { collection, nfts, pagination, metadata, activity_data }
    }
  }
</script>

<script>
  import SvelteSeo from "svelte-seo";
  import Detail from '$components/Detail.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import Checkmark from '$components/icons/Checkmark.svelte'
  import Chart from '$components/Chart.svelte'
  import NftCardList from '../../../lib/NftCardList/index.svelte'
  import Pagination from '../../../components/Pagination.svelte'
  import TwitterShare from '../../../components/TwitterShare.svelte'
  import { page } from '$app/stores'

  import Discord from '$icons/social/Discord.svelte'
  import Twitter from '$icons/social/Twitter.svelte'
  import Telegram from '$icons/social/Telegram.svelte'
  import Website from '$icons/social/Website.svelte'
  import AdBanner from '../../../components/AdBanner.svelte'
  import ContractActivityTable from '../../../lib/ContractActivityTable/index.svelte'
  import ReportCollection from "../../../components/ReportCollection.svelte";
  import ScamBanner from "../../../components/ScamBanner.svelte"
  import variables from "$store/variables";

  export let collection = {}
  export let nfts = []
  export let activity_data = []
  export let pagination = {
    size: 16,
    page: 1,
    total_pages: 0,
    total_elements: 0
  }
  export let metadata = []
  // const collection_image_uri = handleCollectionImageUri(metadata)

  export let currentPage = $page.url.searchParams.get('page') ?? 1
  let contractId = $page.params.contractId

  const max_royalty_bps = 10000
  export let royalty_percentage = collection.royalty_bps ? max_royalty_bps / collection.royalty_bps : 0
  export let listed_tokens = collection.stats?.listed_tokens
  export let sales_volume = collection.stats?.volume
  export let graph_data = collection.volume_over_time ?? []
  
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
  
</script>
<SvelteSeo
  title="Zilkroad : Collection"
  description="An NFT collection"
  twitter={{
    site: "@zilkroad_dex",
    title: "Zilkroad NFT Marketplace",
    description: "Buy, sell and trade Zilliqa NFTs",
    image: "https://staging.zilkroad.io/images/og-image.jpg", // replace me
    imageAlt: "Zilkroad NFT Marketplace",
  }}
  openGraph={{
    title: "Zilkroad : Collections",
    description: "An NFT collection",
    url: 'https:/zilkroad.io',
    type: 'website',
    images: [
      {
        url: 'https://staging.zilkroad.io/images/og-image.jpg', // replace me

        alt: 'Zilkroad NFT Marketplace',
      }
     ]
  }}
/>

<ShapeImage />
<div class="flex flex-col h-full mt-40 space-y-5 md:items-center">
  <div class="max-w-screen-xl mx-5 xl:mx-auto xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense w-full">
      <img
        class="w-full max-w-[600px] h-auto rounded-lg lg:col-start-2 ml-auto"
        src={`${$variables.cdnBase}${collection.contract_address_b16}?optimizer=image&width=650`}
        alt="{collection.name ?? collection.contract_name} hero"
        data-cy="metadata-image"
      />
    <section class="mr-5 lg:col-start-1">
      <div class="flex mt-10 lg:mt-0 items-center">
        <a href={`https://viewblock.io/zilliqa/address/${collection.contract_address_b32}`} class="w-[100px]">
          <h3 class="mr-5 text-zilkroad-teal contract w-[100px] break-normal">
            <!-- TODO: Change to bech32 -->
            {collection.contract_address_b32}
          </h3>
        </a>

        {#if collection.verified ?? collection.is_verified}
          <h4 class="flex items-center ml-10" data-cy="verified-check">
            <Checkmark className="mr-2" />
            Verified
          </h4>
        {/if}
        <div class="ml-auto flex">
          {#if metadata.twitter}
            <a href={metadata.twitter} class="mr-5"><Twitter /></a>
          {/if}
          {#if metadata.discord}
            <a href={metadata.discord} class="mr-5"><Discord /></a>
          {/if}
          {#if metadata.telegram}
            <a href={metadata.telegram} class="mr-5"><Telegram /></a>
          {/if}
          {#if metadata.url}
            <a href={metadata.url} class="mr-5"><Website /></a>
          {/if}
        </div>
      </div>
      <h1 class="mt-5 text-4xl font-medium md:text-5xl">{collection.name ?? collection.contract_name}</h1>

      <p class="pt-5 font-light text-white">
        {metadata.description ?? collection.contract_symbol ?? 'No description'}
      </p>

      {#if collection.excluded}
        <ScamBanner />
      {/if}

      <div class="bg-zilkroad-gray-dark mt-5 rounded-lg">
        <div class="inline-grid grid-flow-col auto-cols-max gap-5 rounded-lg p-5">
          <Detail description="Items listed" value="{listed_tokens} / {collection.nfts_minted}" border="right" />
          <Detail description="Volume" value="${sales_volume}" border="right" />
          <Detail description="Royalty" value="{royalty_percentage}%" />
        </div>
        <div class="rounded-lg p-5 w-full pt-0">
          <div class="flex justify-between w-full border-zilkroad-gray-border border-t-[1px] pt-5">
            <div class="social-share flex">
              <p class="text-white mr-[10px] items-center">Share to</p>
              <TwitterShare text={collection.name ?? collection.contract_name} url={currentPage} via="zilkroad_dex" />
            </div>
            {#if !collection.excluded}
            <ReportCollection {contractId} />
            {/if}
          </div>
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

  {#if !collection.excluded}
  <div class="mt-20">
    <h2 class="text-xl font-semibold mb-5">Price history</h2>
    <Chart bind:data={graph_data} />
  </div>
  <div class="mb-20">
    <ContractActivityTable bind:data={activity_data} />
  </div>
  {/if}
  
  <AdBanner className="md:mx-auto max-w-screen-xl" />

  
</main>
