<script context="module">
  export async function load({ params, fetch }) {
    const { contractId, nftId } = params
    const [collection, nft, collectionNfts, collectionListedNfts] = await Promise.all([
      fetch(`/collections/${contractId}.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/${nftId}.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/nfts.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/listedNfts.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json())
    ])
    // console.table(collection)
    // console.table(nft)
    // console.table(collectionNfts)
    let nfts = collectionNfts.nfts ?? []
    let listedNfts = collectionListedNfts.nfts ?? []
    let pagination = JSON.parse(collectionNfts?.pagination ?? '{}')

    console.log('nft', nft)

    return {
      props: {
        collection,
        nft,
        nfts,
        listedNfts,
        pagination
      }
    }
  }
</script>

<script lang="ts">
  import Header from '$components/Header.svelte'
  import Detail from '$components/Detail.svelte'
  import Big from 'big.js'
  import Button from '$components/Button.svelte'
  import ScrollableSection from '$components/ScrollableSection.svelte'
  import marketplace from '$store/marketplace'
  import Chart from '$components/Chart.svelte'
  import NftCardList from '../../../../lib/NftCardList/index.svelte'
  import { cdnBaseUrl } from '../../../../lib/cdn'
  import wallet from '$store/wallet'
  import { fade } from 'svelte/transition'
  import ShapeImage from '$components/ShapeImage.svelte'
  import NftActivityTable from '$components/NftActivityTable.svelte'
  import SideModal from '../../../../components/SideModal.svelte'
  import SellSidebar from '../../../../components/SellSidebar.svelte'
  import { toast } from '../../../../store/toast'
  import { pollTx } from '../../../../zilpay/poll-tx'
  import { convertWithDecimals } from "../../../../lib/fungibles";

  export let nft
  export let collection
  export let nfts
  export let listedNfts
  export let listing: SingleListing | false // i set it as string cuz undefined no work wtf
  export let metadata: NftMetadata
  export let owner: string

  const max_royalty_bps = 10000
  export let currentPrice = nft.listing?.fungible_amount ?? 0
  export let tokenSymbol = nft.listing?.fungible_symbol ?? ''
  export let sales = nft.sales_count ?? 0
  export let volume = nft.sales_volume ?? 0
  export let royalty_percentage = collection.royalty_bps ? max_royalty_bps / collection.royalty_bps : 0

  const nftDescription = nft.desc ? nft.desc : `This is an NFT for ${nft.collection_name}.`

  $: correctPrice = listing
    ? Big(listing.price)
        .div(10 ** listing.fungible.decimals)
        .toString()
    : '0'

  $: name = `${collection.contract_name} #${nft.token_id}`
  $: imageSrc = `${cdnBaseUrl}${nft.contract_address_b16}/${nft.token_id}?&optimizer=image&width=650`
  $: userWalletIsOwner = nft.owner_address_b32 == $wallet.bech32

  // marketplace meta
  export let sellPrice = 0 // replace with floor price as default?
  export let sellFungible = '0x864895d52504c388a345ef6cd9c800dbbd0ef92a' // WZIL
  export let buyFungible = nft.listing ? nft.listing.fungible_address_b16 : 0
  export let fungibleSymbol = nft.listing ? nft.listing.fungible_symbol : 0
  export let orderId = nft.listing ? nft.listing.static_order_id : 0
  export let listingPrice = nft.listing ? nft.listing.fungible_amount : 0
  export let nftActivity = nft.sales_history ?? []
  export let graphData = nft.graph_data ?? []

  function buy() {
    marketplace.buyNft(buyFungible, listingPrice, orderId)
  }

  async function list() {
    const convertedSellPrice = await convertWithDecimals(sellFungible, sellPrice)
    let { listTx } = await marketplace.listNft(nft.contract_address_b16, nft.token_id, sellFungible, convertedSellPrice)
    if (listTx) {
      toast.add({ message: 'Transaction Pending', type: 'info' })
      await pollTx(listTx)
    } else {
      toast.add({ message: 'Transaction Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Listing Finished', type: 'success' })
  }

  function delist() {
    marketplace.delistNft(orderId)
  }

  let open = false
  let sidebarOpen = false
  let isLoading = false

  function openListModal() {
    open = false
    sidebarOpen = true
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('lock')
  }

  function closeListModal() {
    open = false
    sidebarOpen = false
    isLoading = false
  }

  let nftPlaceholder = '/images/nft-image.png'

  const handleImageError = (image) => {
    image.target.src = nftPlaceholder
  }
</script>

<Header />

<ShapeImage />
<main class="mx-5">
  <div class="flex flex-col md:flex-row justify-between mt-5 lg:max-w-screen-xl lg:mx-auto lg:mt-[120px] gap-10">
    <div class="lg:col-start-1 max-w-full md:max-w-[600px] w-full">
      <h2 class="mt-10 text-white lg:mt-0 underline">
        <a href="/collections/{nft.contract_address_b32}/">{nft.contract_name}</a>
      </h2>
      <h1 class="text-[40px] lg:text-4xl font-semibold mt-5 self-auto mb-5">
        {name}
      </h1>
      <p class="text-white">
        {nft.contract_symbol}
      </p>

      <div class="grid grid-flow-col auto-cols-max gap-5 mt-5 rounded-lg bg-zilkroad-gray-dark p-5">
        {#if currentPrice !== 0}
          <Detail description="Current price" value="{currentPrice} {tokenSymbol}" border="right" />
        {/if}
        <Detail description="Sales" value={sales} border="right" />
        <Detail description="Volume" value="${volume}" border="right" />
        <Detail description="Royalty" value="{royalty_percentage}%" />
      </div>

      <div class="flex items-center mt-5 space-x-2 ">
        <div class="w-10 h-10 rounded-full bg-zilkroad-gray-light" />
        <h3 class="break-all text-white">
          {#if userWalletIsOwner}
            Owned by you
          {:else}
            Owned by <mark class="bg-transparent border-b border-b-zilkroad-gray-light text-white"
              >{nft.owner_address_b32}</mark
            >}
          {/if}
        </h3>
      </div>

      {#if nft.listing}
        <div in:fade>
          <Button on:click={buy} className="w-full mt-14 lg:mt-5 lg:w-auto "
            >Purchase {listingPrice} {fungibleSymbol}
          </Button>
        </div>
      {/if}
      {#if userWalletIsOwner}
        {#if !nft.listing}
          <div in:fade class="flex items-center space-x-2">
            <Button on:click={openListModal} className="w-full mt-14 lg:mt-5 lg:w-auto ">Sell this NFT</Button>
          </div>
        {/if}
        {#if nft.listing}
          <div in:fade>
            <Button on:click={delist} className="w-full mt-14 lg:mt-5 lg:w-auto ">Delist</Button>
          </div>
        {/if}
      {/if}
      <div class="my-20">
        <h2 class="text-xl font-semibold mb-5">History</h2>
        <NftActivityTable bind:data={nftActivity} />
      </div>
      <div class="mt-20">
        <h2 class="text-xl font-semibold mb-5">Price history</h2>
        <Chart bind:data={graphData} />
      </div>
    </div>
    <div class="nft-container lg:col-start-2 max-w-full md:max-w-[496px] w-full">
      <div class="sticky top-[40px] self-auto">
        <img
          class="w-full h-auto rounded-lg bg-zilkroad-gray-dark"
          alt={name}
          src={imageSrc.toLowerCase()}
          on:error={handleImageError}
        />
        {#if nft.token_metadata}
          <ul class="flex flex-wrap gap-5 mt-10 lg:col-start-2">
            {#each nft.token_metadata.attributes as attribute}
              <li class="py-3 px-[10px] bg-zilkroad-gray-dark rounded-lg">
                <span>{attribute.trait_type}: </span>
                <span class="text-zilkroad-gray-lighter">{attribute.value}</span>
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </div>

  <div class="w-full h-[1px] bg-zilkroad-gray-darker my-20 lg:hidden" />

  <h4 class="lg:max-w-screen-xl lg:mx-auto text-2xl font-medium lg:col-span-2 lg:row-start-3 lg:mt-36 mb-10">
    Other listings in {nft.contract_name}
  </h4>
  {#if listedNfts.length > 0}
    <div class="mx-auto max-w-screen-xl">
      <NftCardList bind:nfts={listedNfts} />
    </div>
  {:else}
    <div
      class="flex flex-col justify-center items-center pb-5 h-full min-h-[272px] border border-zilkroad-gray-dark rounded-lg  lg:max-w-screen-xl lg:mx-auto"
    >
      <img src="/icons/Outline/General/Umbrella.svg" alt="No sales history" class="fill-white max-w-[24px] mb-[10px]" />
      <p class="text-[14px]">Well, this is awkward. No one else is selling an NFT in this collection!</p>
    </div>
  {/if}
  <SideModal bind:show={sidebarOpen}>
    <SellSidebar bind:sellPrice {closeListModal} {list} {isLoading} />
  </SideModal>
</main>
