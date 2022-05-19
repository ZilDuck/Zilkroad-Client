<script>
  import { slide } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { cdnBaseUrl } from '../cdn'
  import wallet from '$store/wallet'
  import marketplace from '$store/marketplace'
  import Checkmark from '../../components/icons/Checkmark.svelte'
  import MagnifiyingGlass from '../../components/icons/MagnifiyingGlass.svelte'
  import Trash from '../../components/icons/Trash.svelte'
  import MoneyBill from '../../components/icons/MoneyBill.svelte'
  import Cross from '../../components/icons/Cross.svelte'
  import Elipsis from '../../components/icons/Elipsis.svelte'
  import SideModal from '../../components/SideModal.svelte'
  import SellSidebar from "../../components/SellSidebar.svelte";

  export let nft

  $: userWalletIsOwner = nft.owner_address_b32 === $wallet.bech32

  $: imageSrc = `${cdnBaseUrl}${nft.contract_address_b16}/${nft.token_id}?&optimizer=image&width=400`
  $: name = nft.name ?? nft.symbol + ' #' + nft.token_id

  export let sellPrice = 0 // replace with floor price as default?
  export let sellFungible = '0x864895d52504c388A345eF6cd9C800DBBD0eF92A' // WZIL
  export let orderId = nft.listing ? nft.listing.static_order_id : 0
  export let buyFungible = nft.listing ? nft.listing.fungible_address : 0
  export let listingPrice = nft.listing ? nft.listing.listing_fungible_token_price : 0

  let open = false
  let sidebarOpen = false
  let isLoading = false
  let showNftImage = true

  function toggleOptions() {
    open = !open
  }

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

  function list() {
    open = false
    isLoading = true
    marketplace.listNft(nft.contract_address_b16, String(nft.token_id), sellFungible, String(sellPrice)).finally(() => isLoading = false)
  }

  function delist() {
    open = false
    marketplace.delistNft(orderId)
  }

  function view() {
    open = false
    goto(`/collections/${nft.contract_address_b32}/${nft.token_id}`)
  }

  function buy() {
    open = false
    marketplace.buyNft(buyFungible, listingPrice, orderId)
  }

  let nftPlaceholder = '/images/nft-image.png'

  const handleImageError = (image) => {
    image.target.src = nftPlaceholder
  }

</script>

<article class='group flex flex-col w-full relative'>
  <a href='/collections/{nft.contract_address_b16}/{nft.token_id}' class='mb-1'>
    <div class='object-cover w-full h-auto rounded-lg bg-zilkroad-gray-darker'>
      <img
        src={imageSrc}
        alt='Nft'
        class='object-cover w-full h-auto rounded-lg bg-zilkroad-gray-darker'
        on:error={handleImageError}
        width='400px'
        height='400px'
        loading='eager'
      />
    </div>
    <div class="flex items-start mt-5">
      <Checkmark className="mr-[10px]" />
      <h1 class="text-lg font-medium">
        {name}
      </h1>
    </div>
  </a>
  <a href="/collections/{nft.contract_address_b32}" class="mb-1">
    <h2 class="font-light text-zilkroad-gray-lighter">
      {nft.collection_name}
    </h2>
  </a>

  {#if listingPrice}
    <div class="flex items-start">
      <img
        src="https://meta.viewblock.io/zilliqa.zil1gvr0jgwfsfmxsyx0xsnhtlte4gks6r3yk8x5fn/logo?t=dark"
        class="w-4 h-4 mr-[10px] mt-1"
        alt="logo"
      />
      <h3 class="font-light">
        {listingPrice}
        WZIL
      </h3>
    </div>
  {/if}

  <button
    class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-white bg-black rounded-lg md:hidden md:group-hover:flex"
    class:open
    on:click={toggleOptions}
  >
    <Elipsis />
  </button>

  {#if open}
    <div transition:slide class="absolute p-5 w-full bg-gray-900 rounded-lg">
      <div class="flex items-center pb-3.5 border-gray-800 border-b justify-between">
        <h6 class="font-semibold text-zilkroad-gray-light">Options</h6>
        <button
          class="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg"
          on:click={toggleOptions}
        >
          <Cross />
        </button>
      </div>
      <ul class="space-y-2.5 font-normal mt-5 text-zilkroad-gray-light">
        <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={view}>
          <MagnifiyingGlass />
          <button>View NFT</button>
        </li>
        {#if orderId}
          <li class="flex items-center space-x-5 cursor-pointer" on:click={buy}>
            <Trash />
            <button>Buy listing</button>
          </li>
        {/if}
        {#if userWalletIsOwner}
          {#if orderId}
            <li class="flex items-center space-x-5 cursor-pointer" on:click={delist}>
              <Trash />
              <button>Remove listing</button>
            </li>
          {/if}
          {#if !orderId}
            <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={openListModal}>
              <MoneyBill />
              <button>Sell</button>
            </li>
          {/if}
        {/if}
      </ul>
    </div>
  {/if}
</article>

<SideModal bind:show={sidebarOpen}>
  <SellSidebar sellPrice={sellPrice} closeListModal={closeListModal} list={list} isLoading={isLoading} />
</SideModal>