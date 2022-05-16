<script context="module">
  export async function load({ params, fetch }) {
    const { contractId, nftId } = params
    const [collection, nft, collectionNfts] = await Promise.all([
      fetch(`/collections/${contractId}.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/${nftId}.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json()),
      fetch(`/collections/${contractId}/nfts.json`)
        .catch((error) => console.log(error))
        .then((r) => r.json())
    ])
    // console.table(collection)
    // console.table(nft)
    // console.table(collectionNfts)
    let nfts = collectionNfts.nfts
    let pagination = JSON.parse(collectionNfts.pagination)
    return {
      props: {
        collection,
        nft,
        nfts,
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

  export let nft
  export let collection
  export let nfts
  export let listing: SingleListing | false // i set it as string cuz undefined no work wtf
  export let metadata: NftMetadata
  export let owner: string

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
  export let sellFungible = '0x864895d52504c388A345eF6cd9C800DBBD0eF92A' // WZIL
  export let buyFungible = nft.listing ? nft.listing.fungible_address_b16 : 0
  export let fungibleSymbol = nft.listing ? nft.listing.fungible_symbol : 0
  export let orderId = nft.listing ? nft.listing.static_order_id : 0
  export let listingPrice = nft.listing ? nft.listing.fungible_amount : 0
  export let nftActivity = []

  function buy() {
    marketplace.buyNft(buyFungible, listingPrice, orderId)
  }

  function list() {
    marketplace.listNft(nft.contract_address_b16, nft.token_id, sellFungible, sellPrice)
  }

  function delist() {
    marketplace.delistNft(orderId)
  }
</script>

<Header />

<ShapeImage />
<main class="mx-5">
  <div class="grid-flow-col-dense mx-5 mt-5 lg:max-w-screen-xl lg:mx-auto lg:grid lg:grid-cols-2 lg:mt-[120px] gap-10">
    <div class="lg:col-start-1 max-w-[520px]">
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
        <Detail description="Current price" value="1,200 XSGD" border="right" />
        <Detail description="Sales" value="5" border="right" />
        <Detail description="Volume" value="10000 ZIL" border="right" />
        <Detail description="Royalty" value="5%" />
      </div>

      <div class="flex items-center mt-5 space-x-2 ">
        <div class="w-10 h-10 rounded-full bg-zilkroad-gray-light" />
        <h3 class="break-all text-white">
          Owned by
          <mark class="bg-transparent border-b border-b-zilkroad-gray-light text-white">{nft.owner_address_b32}</mark>
          {userWalletIsOwner ? 'You' : ''}
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
            <div>
              <label class="text-amber-50" for="sellPrice">Sell Price</label>
              <input id="sellPrice" bind:value={sellPrice} />
            </div>
            <Button on:click={list} className="w-full mt-14 lg:mt-5 lg:w-auto ">List</Button>
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
        <Chart />
      </div>
    </div>
    <div class="nft-container lg:col-start-2 sticky top-[40px] self-auto">
      <img class="w-full h-auto rounded-lg bg-zilkroad-gray-dark" alt={name} src={imageSrc.toLowerCase()} />
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

  <div class="w-full h-[1px] bg-zilkroad-gray-darker my-20 lg:hidden" />

  <h4 class="lg:max-w-screen-xl lg:mx-auto text-2xl font-medium lg:col-span-2 lg:row-start-3 lg:mt-36">
    Other listings in {nft.contract_name}
  </h4>
  <ScrollableSection className="px-0 lg:col-span-2 lg:grid-cols-4 lg:row-start-4 mt-10">
    <NftCardList {nfts} />
  </ScrollableSection>
</main>
