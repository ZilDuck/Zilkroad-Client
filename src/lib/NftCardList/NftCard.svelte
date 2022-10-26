<script>
  import { slide } from 'svelte/transition'
  import { goto } from '$app/navigation'
  import { cdnBaseUrl } from '../cdn'
  import { clickOutside } from '$lib/listeners'
  import wallet from '$store/wallet'
  import marketplace from '$store/marketplace'
  import Checkmark from '../../components/icons/Checkmark.svelte'
  import MagnifiyingGlass from '../../components/icons/MagnifiyingGlass.svelte'
  import Trash from '../../components/icons/Trash.svelte'
  import MoneyBill from '../../components/icons/MoneyBill.svelte'
  import Cross from '../../components/icons/Cross.svelte'
  import Elipsis from '../../components/icons/Elipsis.svelte'
  import Pencil from '../../components/icons/Pencil.svelte'
  import Burn from '../../components/icons/Burn.svelte'
  import Transfer from '../../components/icons/Transfer.svelte'
  import SideModal from '../../components/SideModal.svelte'
  import SellSidebar from '$components/sidebars/SellSidebar.svelte'
  import BuySidebar from '$components/sidebars/BuySidebar.svelte'
  import { toast } from '../../store/toast'
  import { transaction } from '../../store/transaction'
  import { pollTx } from '../../zilpay/poll-tx'
  import TokenPrice from '../../components/TokenPrice.svelte'
  import BurnModal from '../../components/modals/BurnModal.svelte'
  import TransferModal from '../../components/modals/TransferModal.svelte'
  import EditSidebar from '../../components/sidebars/EditSidebar.svelte'
  import { convertWithDecimals } from '../fungibles.js'

  export let nft

  $: userWalletIsOwner = (nft?.current_owner || nft?.owner_address_b16) === $wallet.base16
  $: imageSrc = `${cdnBaseUrl}${nft.contract_address_b16}/${nft.token_id}?&optimizer=image&height=400&width=400&aspect_ratio=1:1`
  $: name = nft.name ?? nft.symbol + ' #' + nft.token_id

  export let sellPrice = 0 // replace with floor price as default?
  export let sellFungible
  export let orderId = 0
  export let buyFungible = nft?.fungible_address ?? nft?.listing?.fungible_address ?? ''
  export let listingPrice = nft.token_price ? nft.token_price : 0
  export let priceSymbol = nft?.token_symbol ? nft?.token_symbol.toUpperCase() : 'WZIL'
  export let verified = nft.verified ?? false
  export let royalty_bps = nft.royalty_bps ?? 0

  if (nft.listing) {
    orderId = nft.listing.static_order_id
  } else if (nft.order_id) {
    orderId = nft.order_id
  }

  let open = false
  let sidebarOpen = {
    edit: false,
    sell: false,
    buy: false
  }
  let burnModalOpen = false
  let transferModalOpen = false
  let isLoading = false
  let showNftImage = true

  function toggleOptions() {
    open = !open
  }

  function closeOptions() {
    open = false
  }

  function openSidebar(sidebar) {
    open = false
    switch (sidebar) {
      case 'edit':
        sidebarOpen.edit = true
        break
      case 'sell':
        sidebarOpen.sell = true
        break
      case 'buy':
        sidebarOpen.buy = true
        break
    }
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('lock')
  }

  function closeSidebar() {
    open = false
    Object.keys(sidebarOpen).forEach((i) => {
      sidebarOpen[i] = false
    })
    isLoading = false
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('lock')
  }

  async function approve() {
    let { spenderTx } = await marketplace.approveNftSpender(nft.contract_address_b16, nft.token_id)
    if (spenderTx) {
      toast.add({ message: 'Approving Zilkroad as Nft Spender', type: 'info' })
      const transactionID = transaction.add({
        message: 'Approving NFT Spender',
        type: 'pending',
        tx: spenderTx,
        nftContract: nft.contract_address_b32,
        nftTokenId: nft.token_id
      })
      ;(await pollTx(spenderTx))
        ? transaction.updateType(transactionID, 'success')
        : transaction.updateType(transactionID, 'failed')
    } else {
      toast.add({ message: 'Approval Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Approval Confirmed', type: 'success' })
  }

  async function list() {
    const convertedSellPrice = convertWithDecimals($marketplace.approvedFungibles, sellFungible, sellPrice)
    let { listTx } = await marketplace.listNft(nft.contract_address_b16, nft.token_id, sellFungible, convertedSellPrice)
    if (listTx) {
      toast.add({ message: 'Listing NFT', type: 'info' })
      const transactionID = transaction.add({
        message: 'Listing NFT',
        type: 'pending',
        tx: listTx,
        nftContract: nft.contract_address_b32,
        nftTokenId: nft.token_id
      })
      ;(await pollTx(listTx))
        ? transaction.updateType(transactionID, 'success')
        : transaction.updateType(transactionID, 'failed')
    } else {
      toast.add({ message: 'Listed Failed', type: 'error' })
      return
    }
    toast.add({ message: 'NFT Listed', type: 'success' })
  }

  function delist() {
    open = false
    marketplace.delistNft(orderId)
  }

  async function edit() {
    const convertedSellPrice = convertWithDecimals($marketplace.approvedFungibles, sellFungible, sellPrice)
    let { editTx } = await marketplace.editListedNft(orderId, sellFungible, convertedSellPrice)
    if (editTx) {
      toast.add({ message: 'Editing Listing', type: 'info' })
      const transactionID = transaction.add({
        message: `Editing ${name}`,
        type: 'pending',
        tx: editTx,
        nftContract: nft.contract_address_b32,
        nftTokenId: nft.token_id
      })
      ;(await pollTx(editTx))
        ? transaction.updateType(transactionID, 'success')
        : transaction.updateType(transactionID, 'failed')
    } else {
      toast.add({ message: 'Listing Edit Failed', type: 'error' })
      return
    }
    toast.add({ message: 'Listing Updated', type: 'success' })
  }

  function view() {
    open = false
    goto(`/collections/${nft.contract_address_b32}/${nft.token_id}`)
  }

  function increaseAllowance() {
    open = false
    marketplace.increaseFungibleAllowance(buyFungible, listingPrice)
  }

  function buy() {
    open = false
    marketplace.buyNft(buyFungible, listingPrice, orderId)
  }

  function openBurnModal() {
    open = false
    burnModalOpen = true
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('lock')
  }

  function openTransferModal() {
    open = false
    transferModalOpen = true
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('lock')
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
    {#if verified}
      <div class="flex items-start mt-5">
        <Checkmark className="mr-[10px]" />
        <h1 class="text-lg font-medium">
          {name}
        </h1>
      </div>
    {/if}
  </a>
  <a href="/collections/{nft.contract_address_b32}" class="mb-1">
    <h2 class="font-light text-zilkroad-gray-lighter">
      {nft.collection_name}
    </h2>
  </a>

  {#if listingPrice}
    <div class="flex items-start">
      <img alt="{priceSymbol} Token Logo" class="w-4 h-4 mr-[10px] mt-1" src="/images/tokens/{priceSymbol}.png" />
      <h3 class="font-light">
        <TokenPrice price={listingPrice} fungibleAddressOrSymbol={priceSymbol} reverse="true" />
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
        {#if orderId && !userWalletIsOwner}
          <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={() =>openSidebar('buy')}>
            <MoneyBill />
            <button>Buy</button>
          </li>
        {/if}
        {#if userWalletIsOwner}
          {#if orderId}
            <li class="flex items-center space-x-5 cursor-pointer" on:click={delist}>
              <Trash />
              <button>Remove listing</button>
            </li>
          {/if}
          {#if orderId}
            <li class="flex items-center space-x-5 cursor-pointer" on:click={() =>openSidebar('edit')}>
              <Pencil />
              <button>Edit listing</button>
            </li>
          {/if}
          {#if !orderId}
            <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={() => openSidebar('sell')}>
              <MoneyBill />
              <button>Sell</button>
            </li>
          {/if}
          <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={openTransferModal}>
            <Transfer />
            <button>Transfer</button>
          </li>
          <li class="flex items-center space-x-5 align-middle cursor-pointer" on:click={openBurnModal}>
            <Burn />
            <button>Burn</button>
          </li>
        {/if}
      </ul>
    </div>
  {/if}
</article>

{#if userWalletIsOwner}
  <SideModal bind:show={sidebarOpen.sell}>
    <SellSidebar
      bind:sellPrice
      bind:sellFungible
      bind:royalty_bps
      closeListModal={closeSidebar}
      {list}
      {approve}
      {imageSrc}
      {name}
      tokenContract={nft.contract_address_b16}
      contract_address_b32={nft.contract_address_b32}
      tokenID={nft.token_id}
    />
  </SideModal>
  <SideModal bind:show={sidebarOpen.edit} title="Edit">
    <EditSidebar
      bind:sellPrice
      bind:sellFungible
      bind:royalty_bps
      {edit}
      closeListModal={closeSidebar}
      {imageSrc}
      {name}
      contract_address_b32={nft.contract_address_b32}
      token_id={nft.token_id}
    />
  </SideModal>
{/if}

{#if !userWalletIsOwner}
  <SideModal bind:show={sidebarOpen.buy} title="Buy NFT">
    <BuySidebar
      bind:sellPrice={listingPrice}
      {buyFungible}
      buyFungibleSymbol={priceSymbol}
      closeListModal={closeSidebar}
      {increaseAllowance}
      {buy}
      {nft}
      {imageSrc}
      {name}
      contract_address_b32={nft.contract_address_b32}
      token_id={nft.token_id}
    /></SideModal
  >
{/if}

{#if burnModalOpen}
  <BurnModal
    bind:show={burnModalOpen}
    nftContract={nft.contract_address_b16}
    nftTokenId={nft.token_id}
    title="Burn NFT"
  />
{/if}

{#if transferModalOpen}
  <TransferModal
    bind:show={transferModalOpen}
    nftContract={nft.contract_address_b16}
    nftTokenId={nft.token_id}
    nftCollectionName={nft.collection_name}
    nftName={name}
    nftImage={imageSrc}
  />
{/if}
