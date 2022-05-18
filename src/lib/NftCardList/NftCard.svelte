<script>
  import { slide, fly } from 'svelte/transition'
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
  import Zil from '../../components/icons/Zil.svelte'
  import SvgLoader from '../../components/SvgLoader.svelte'

  let nftPlaceholder = '/images/nft-image.png'

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
  <h4 class='text-[20px] font-[600] mb-5'>Item name</h4>
  <p class='mb-5 text-zilkroad-text-normal'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
  </p>
  <img src='/images/nft-image.png' alt="NFT image you're selling" class='w-full pb-5' />
  <div class='text-white h-16 flex items-center bg-zilkroad-gray-dark p-5 mb-5 rounded-lg w-full'>
    <input class='text-black' type='text' placeholder={sellPrice} bind:value={sellPrice} />
    <Zil />
    <span class='ml-5'>Convert Zil</span>
  </div>
  <p class='flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5'>
    Royalties<span class='text-white'>122.00 XSGD - 10%</span>
  </p>
  <p class='flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5'>
    Total after royalties<span class='text-white'>1098.00 XSGD</span>
  </p>
  <p class='mb-10 text-zilkroad-text-normal'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
  </p>
  <button class='text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5'
          on:click={closeListModal}
  >Cancel
  </button
  >
  <button class='text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full'
          on:click={list} disabled={isLoading}
  >Submit
    {#if isLoading}
      <span in:fly={{ y: -10 }}>
        <SvgLoader></SvgLoader>
      </span>
    {/if}
  </button
  >
</SideModal>
