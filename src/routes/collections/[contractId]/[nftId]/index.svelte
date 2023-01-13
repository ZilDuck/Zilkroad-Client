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

    let nfts = collectionNfts.nfts ?? []
    let listedNfts = collectionListedNfts.nfts ?? []
    let pagination = JSON.parse(collectionNfts?.pagination ?? '{}')

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
  import SvelteSeo from 'svelte-seo'
  import Header from '$components/Header.svelte'
  import Detail from '$components/Detail.svelte'
  import Big from 'big.js'
  import Button from '$components/Button.svelte'
  import marketplace  from '$store/marketplace'
  import variables  from '$store/variables'
  import Chart from '$components/Chart.svelte'
  import Checkmark from '$components/icons/Checkmark.svelte'
  import NftCardList from '../../../../lib/NftCardList/index.svelte'
  import wallet from '$store/wallet'
  import { fade } from 'svelte/transition'
  import ShapeImage from '$components/ShapeImage.svelte'
  import NftActivityTable from '../../../../lib/NftActivityTable/index.svelte'
  import SideModal from '$components/SideModal.svelte'
  import SellSidebar from '$components/sidebars/SellSidebar.svelte'
  import { convertWithDecimals } from '../../../../lib/fungibles'
  import TokenPrice from '../../../../components/TokenPrice.svelte'
  import EditSidebar from '../../../../components/sidebars/EditSidebar.svelte'
  import BuySidebar from '../../../../components/sidebars/BuySidebar.svelte'
  import ScamBanner from '../../../../components/ScamBanner.svelte'

  export let nft
  export let collection
  export let listedNfts
  export let listing: SingleListing | false // i set it as string cuz undefined no work wtf

  export let max_royalty_bps = Number($variables.maxRoyaltyBps)
  export let royalty_bps = collection?.royalty_bps ?? 0
  export let royalty_percentage = Number((royalty_bps / max_royalty_bps) * 100).toFixed(2) ?? 0.0
  export let tax_amount = Number($variables.taxAmount)
  export let tax_percentage = Number((tax_amount / max_royalty_bps) * 100).toFixed(2) ?? 0.0

  export let sales = nft.sales_count ?? 0
  export let volume = nft.sales_volume ?? 0

  export let excluded = nft.excluded ?? false

  const nftDescription = nft.desc ? nft.desc : `This is an NFT for ${nft.collection_name}.`

  $: correctPrice = listing
    ? Big(listing.price)
        .div(10 ** listing.fungible.decimals)
        .toString()
    : '0'

  $: name = `${collection.contract_name} #${nft.token_id}`
  $: imageSrc = `${$variables.cdnBase}${nft.contract_address_b16}/${nft.token_id}?&optimizer=image&width=650`
  $: userWalletIsOwner = nft.owner_address_b32 == $wallet.bech32

  // marketplace meta
  export let sellPrice = 0 // replace with floor price as default?
  export let sellFungible
  export let buyFungible = nft.listing ? nft.listing.fungible_address_b16 : 0
  export let fungibleSymbol = nft.listing ? nft.listing.fungible_symbol : 0
  export let orderId = nft.listing ? nft.listing.static_order_id : 0
  export let listingPrice = nft.listing ? nft.listing.fungible_amount : 0
  export let nftActivity = nft.sales_history ?? []
  export let graphData = nft.graph_data ?? []
  export let verified = nft.verified ? nft.verified : false

  async function approve() {
    await marketplace.approveNftSpender(nft.contract_address_b16, nft.token_id)
  }

  async function list() {
    const convertedSellPrice = convertWithDecimals($marketplace.approvedFungibles, sellFungible, sellPrice)
    const { txSuccess } = await marketplace.listNft(
      nft.contract_address_b16,
      nft.token_id,
      sellFungible,
      convertedSellPrice
    )
    if (txSuccess) {
      nft = getNftData(nft.contract_address_b32, nft.token_id)
      closeModal()
    }
  }

  async function edit() {
    const convertedSellPrice = convertWithDecimals($marketplace.approvedFungibles, sellFungible, sellPrice)
    const { txSuccess } = await marketplace.editListedNft(
      orderId,
      sellFungible,
      convertedSellPrice,
      name,
      nft.contract_address_b32,
      nft.token_id
    )
    if (txSuccess) {
      listingPrice = convertedSellPrice
      closeModal()
    }
  }

  async function increaseAllowance() {
    await marketplace.increaseFungibleAllowance(buyFungible, listingPrice, nft.contract_address_b32, nft.token_id)
  }

  async function buy() {
    const { txSuccess } = marketplace.buyNft(
      buyFungible,
      listingPrice,
      orderId,
      name,
      nft.contract_address_b32,
      nft.token_id
    )
    if (txSuccess) {
      nft = getNftData(nft.contract_address_b32, nft.token_id)
      closeModal()
    }
  }

  function delist() {
    marketplace.delistNft(orderId)
  }

  let listSidebarOpen = false
  let editSidebarOpen = false
  let buySidebarOpen = false
  let isLoading = false

  function openModal(modalName) {
    switch (modalName) {
      case 'buy':
        buySidebarOpen = true
        break
      case 'list':
        listSidebarOpen = true
        break
      case 'edit':
        editSidebarOpen = true
        break
    }
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('lock')
  }

  function closeModal() {
    buySidebarOpen = false
    listSidebarOpen = false
    editSidebarOpen = false
  }

  let nftPlaceholder = '/images/nft-image.png'

  const handleImageError = (image) => {
    image.target.src = nftPlaceholder
  }

  async function getNftData(contractId, nftId) {
    nft = await fetch(`/collections/${contractId}/${nftId}.json`)
  }
</script>

<SvelteSeo
  title="Zilkroad : NFT"
  description="An NFT from a collection"
  twitter={{
    site: '@zilkroad_dex',
    title: 'Zilkroad NFT Marketplace',
    description: 'Buy, sell and trade Zilliqa NFTs',
    image: 'https://staging.zilkroad.io/images/og-image.jpg', // replace me
    imageAlt: 'Zilkroad NFT Marketplace'
  }}
  openGraph={{
    title: 'Zilkroad : NFT',
    description: 'An NFT from a collection',
    url: 'https:/zilkroad.io',
    type: 'website',
    images: [
      {
        url: 'https://staging.zilkroad.io/images/og-image.jpg', // replace me

        alt: 'Zilkroad NFT Marketplace'
      }
    ]
  }}
/>

<Header />

<ShapeImage />
<main class="mx-5">
  <div class="flex flex-col md:flex-row justify-between mt-5 lg:max-w-screen-xl lg:mx-auto lg:mt-[120px] gap-10">
    <div class="lg:col-start-1 max-w-full md:max-w-[600px] w-full">
      <div class="flex mt-10">
        <h2 class="text-white lg:mt-0 underline">
          <a href="/collections/{nft.contract_address_b32}/">{nft.contract_name}</a>
        </h2>
        {#if verified}
          <h4 class="flex items-center ml-10">
            <Checkmark className="mr-2" />
            Verified
          </h4>
        {/if}
      </div>
      <h1 class="text-[40px] lg:text-4xl font-semibold mt-5 self-auto mb-5">
        {name}
      </h1>
      <p class="text-white">
        {nft.contract_symbol}
      </p>

      {#if excluded}
      <ScamBanner />
      {/if}

      <div class="grid grid-flow-col auto-cols-max gap-5 mt-5 rounded-lg bg-zilkroad-gray-dark p-5">
        {#if listingPrice !== 0}
          <Detail
            description="Current price"
            value="{convertWithDecimals(
              $marketplace.approvedFungibles,
              buyFungible,
              listingPrice,
              true
            )} {fungibleSymbol}"
            border="right"
          />
        {/if}
        <Detail description="Sales" value={sales} border="right" />
        <Detail description="Volume" value="${volume}" border="right" />
        <Detail description="Royalty" value="{royalty_percentage}%" />
      </div>

      <div class="flex items-center mt-5 space-x-2 ">
        <img src="https://i.pickadummy.com/index.php?imgsize=25x25&cache={nft.owner_address_b16}"
        alt="Wallet avatar"
        class="rounded-full" />
        <h3 class="break-all text-white">
          {#if userWalletIsOwner}
            Owned by you
          {:else}
            Owned by <a href="/wallet/{nft.owner_address_b32}">
              <mark class="bg-transparent border-b border-b-zilkroad-gray-light text-white"
                >{nft.owner_address_b32}</mark
              >
            </a>
          {/if}
        </h3>
      </div>

      {#if nft.listing && !userWalletIsOwner}
        <div in:fade>
          <Button on:click={() => openModal('buy')} className="w-full mt-14 lg:mt-5 lg:w-auto ">
            Purchase <TokenPrice price={listingPrice} fungibleAddressOrSymbol={buyFungible} reverse="true" />
            {fungibleSymbol}
          </Button>
        </div>
      {/if}
      {#if userWalletIsOwner}
        {#if !nft.listing && !excluded}
          <div in:fade class="flex items-center space-x-2">
            <Button on:click={() => openModal('list')} className="w-full mt-14 lg:mt-5 lg:w-auto ">Sell this NFT</Button
            >
          </div>
        {/if}
        {#if nft.listing}
          <div in:fade>
            <Button on:click={delist} className="w-full mt-14 lg:mt-5 lg:w-auto ">Delist</Button>
            {#if !excluded}
            <Button on:click={() => openModal('edit')} className="w-full mt-14 lg:mt-5 lg:w-auto ">Edit</Button>
            {/if}
          </div>
        {/if}
      {/if}
      {#if !excluded}
      <div class="my-20">
        <h2 class="text-xl font-semibold mb-5">History</h2>
        <NftActivityTable bind:data={nftActivity} />
      </div>
      <div class="mt-20">
        <h2 class="text-xl font-semibold mb-5">Price history</h2>
        {#if !graphData}
        <Chart bind:data={graphData} />
       {/if}
      </div>
      {/if}
    </div>
    <div class="nft-container lg:col-start-2 max-w-full md:max-w-[496px] w-full">
      <div class="sticky top-[40px] self-auto">
        <img
          class="w-full h-auto rounded-lg bg-zilkroad-gray-dark"
          alt={name}
          src={imageSrc.toLowerCase()}
          on:error={handleImageError}
        />
        {#if nft.token_metadata.attributes}
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

  {#if !excluded}
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
  {/if}
  <SideModal bind:show={listSidebarOpen}>
    <SellSidebar
      bind:sellPrice
      bind:sellFungible
      bind:royalty_bps
      bind:max_royalty_bps
      bind:tax_amount
      bind:royalty_percentage
      bind:tax_percentage
      closeListModal={closeModal}
      {list}
      {approve}
      {imageSrc}
      {name}
      tokenContract={nft.contract_address_b16}
      contract_address_b32={nft.contract_address_b32}
      tokenID={nft.token_id}
    />
  </SideModal>
  <SideModal bind:show={editSidebarOpen} title="Edit">
    <EditSidebar
      bind:sellPrice
      bind:sellFungible
      bind:royalty_bps
      {edit}
      closeListModal={closeModal}
      {imageSrc}
      {name}
      contract_address_b32={nft.contract_address_b32}
      token_id={nft.token_id}
    />
  </SideModal>
  <SideModal bind:show={buySidebarOpen} title="Buy NFT">
    <BuySidebar
      bind:sellPrice={listingPrice}
      bind:buyFungible
      buyFungibleSymbol={fungibleSymbol}
      closeListModal={closeModal}
      {increaseAllowance}
      {buy}
      {isLoading}
      {nft}
      {imageSrc}
      {name}
    /></SideModal
  >
</main>
