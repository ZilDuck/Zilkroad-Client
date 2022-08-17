<script>
  import { slide } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { cdnBaseUrl } from '../cdn'
  import { clickOutside } from '$lib/listeners.js'
  import wallet from '$store/wallet'
  import marketplace from '$store/marketplace'
  import Checkmark from '../../components/icons/Checkmark.svelte'
  import MagnifiyingGlass from '../../components/icons/MagnifiyingGlass.svelte'
  import Trash from '../../components/icons/Trash.svelte'
  import MoneyBill from '../../components/icons/MoneyBill.svelte'
  import Cross from '../../components/icons/Cross.svelte'
  import Elipsis from '../../components/icons/Elipsis.svelte'
  import SideModal from '../../components/SideModal.svelte'
  import SellSidebar from '$components/sidebars/SellSidebar.svelte'
  import BuySidebar from '$components/sidebars/BuySidebar.svelte'
  import { toast } from '../../store/toast'
  import { pollTx } from '../../zilpay/poll-tx'
  import TokenPrice from "../../components/TokenPrice.svelte";

  export let currencies = [
    {
      name: 'XSGD',
    },
    {
      name: 'zWBTC',
    },
    {
      name: 'wZIL',
    },
    {
      name: 'zUSDT',
    },
    {
      name: 'zETH',
    },
    {
      name: 'gZIL',
    }
  ]

  export let nft

  $: userWalletIsOwner = nft.owner_address_b32 === $wallet.bech32
  $: imageSrc = `${cdnBaseUrl}${nft.contract_address_b16}/${nft.token_id}?&optimizer=image&height=400&width=400&aspect_ratio=1:1`
  $: name = nft.name ?? nft.symbol + ' #' + nft.token_id

  export let sellPrice = 0 // replace with floor price as default?
  export let sellFungible = '0x864895d52504c388A345eF6cd9C800DBBD0eF92A' // WZIL
  export let orderId = nft.listing ? nft.listing.static_order_id : 0
  export let buyFungible = nft.listing ? nft.listing.fungible_address : 0
  export let listingPrice = nft.token_price ? nft.token_price : 0
  export let priceSymbol = nft.token_symbol ? nft.token_symbol.toUpperCase() : 'WZIL'

  let open = false
  let sidebarOpen = false
  let isLoading = false
  let showNftImage = true

  function toggleOptions() {
    open = !open
  }

  function closeOptions() {
    open = false
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

  async function list() {
    open = false
    isLoading = true
    let { listTx } = await marketplace.listNft(
      nft.contract_address_b16,
      String(nft.token_id),
      sellFungible,
      String(sellPrice)
    )
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

<article class="group flex flex-col w-full relative" use:clickOutside on:click_outside={closeOptions}>
  <a href="/collections/{nft.contract_address_b16}/{nft.token_id}" class="mb-1">
    <div
      class="object-cover overflow-hidden w-full h-auto rounded-lg bg-zilkroad-gray-dark flex items-center justify-center"
    >
      <img
        src={imageSrc}
        alt="Nft"
        class="object-cover bg-zilkroad-gray-darker scale-100 hover:scale-110 transition-all w-full"
        on:error={handleImageError}
        loading="eager"
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
        alt="{priceSymbol} Token Logo"
        class="w-4 h-4 mr-[10px] mt-1"
        src="/images/tokens/{priceSymbol}.png"
      />
      <h3 class="font-light">
        <TokenPrice price={listingPrice} fungibleAddressOrSymbol={priceSymbol} reverse="true"/>
        {priceSymbol}
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
        {#if !userWalletIsOwner}
          <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={openListModal}>
            <MoneyBill />
            <button>Buy</button>
          </li>
        {/if}
      </ul>
    </div>
  {/if}
</article>

{#if userWalletIsOwner}
  <SideModal bind:show={sidebarOpen}>
    <SellSidebar bind:sellPrice {closeListModal} {list} {isLoading} {nft} {imageSrc} {name} />
  </SideModal>
{/if}

{#if !userWalletIsOwner}
  <SideModal bind:show={sidebarOpen} title="Buy NFT">
    <BuySidebar bind:sellPrice {closeListModal} {list} {isLoading} {nft} {imageSrc} {name} /></SideModal
  >
{/if}
