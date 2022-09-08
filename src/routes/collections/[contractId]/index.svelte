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
  import Report from '$components/icons/Report.svelte'
  import NftCardList from '../../../lib/NftCardList/index.svelte'
  import Pagination from '../../../components/Pagination.svelte'
  import TwitterShare from '../../../components/TwitterShare.svelte'
  import { page } from '$app/stores'
  import { cdnBaseUrl } from '../../../lib/cdn'
  import { toast } from '$store/toast'
  import wallet from '$store/wallet'

  import Discord from '$icons/social/Discord.svelte'
  import Twitter from '$icons/social/Twitter.svelte'
  import Telegram from '$icons/social/Telegram.svelte'
  import Website from '$icons/social/Website.svelte'
  import AdBanner from "../../../components/AdBanner.svelte";

  export let collection = {}
  export let nfts = []
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

  async function reportCollection() {
    const user = $wallet.bech32 ?? "<no-user>"
    await fetch(`/collections/${contractId}/report.json?user=${user}`)
    .catch((error) => {
      console.log(error)
      toast.add({ message: "Issue with reporting collection, please try again later", type: "error" })
    })
    .then((r) => {
      console.log("User %s successfully reported collection %s", user, contractId)
      toast.add({ message: "Collection reported, this will be reviewed by the Zilkroad Team", type: "success" })
    })
  }

  console.log(pagination)
</script>

<ShapeImage />
<div class="flex flex-col h-full mt-40 space-y-5 md:items-center">
  <div class="max-w-screen-xl mx-5 xl:mx-auto xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense w-full">
    {#if collection.verified ?? collection.is_verified}
      <img
        class="w-full max-w-[600px] h-auto rounded-lg lg:col-start-2 ml-auto"
        src={image_uri}
        alt="{collection.name ?? collection.contract_name} hero"
      />
    {/if}
    <section class="mr-5 lg:col-start-1">
      <div class="flex mt-10 lg:mt-0 items-center">
        <a href={`https://viewblock.io/zilliqa/address/${collection.contract_address_b32}`} class="w-[100px]">
          <h3 class="mr-5 text-zilkroad-teal contract w-[100px] break-normal">
            <!-- TODO: Change to bech32 -->
            {collection.id ?? collection.contract_address_b32}
          </h3>
        </a>

        {#if collection.verified ?? collection.is_verified}
          <h4 class="flex items-center ml-10">
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
            <button class="flex items-center">
              <p class="text-[#D8A270] mr-[10px]" on:click={reportCollection}>Report collection</p>
              <Report />
            </button>
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
  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>
