<script lang="ts">
  import Big from 'big.js'
  import { createEventDispatcher, onMount } from 'svelte'
  import Checkmark from './icons/Checkmark.svelte'
  import { slide } from 'svelte/transition'
  import MagnifiyingGlass from './icons/MagnifiyingGlass.svelte'
  import MoneyBill from './icons/MoneyBill.svelte'
  import Cross from './icons/Cross.svelte'
  import Elipsis from './icons/Elipsis.svelte'
  import Trash from './icons/Trash.svelte'
  import { goto } from '$app/navigation'
  import marketplace from '$store/marketplace'

  export let nft: {
    id?: string
    token: {
      id: string
      name?: string
    }
    contract: {
      address: string
      name: string
      symbol: string
      verified?: boolean
    }
    price?: string
    fungible?: {
      symbol: string
      decimals: number
    }
  }

  export let className = ''
  export let listedOrOwned: 'listed' | 'owned' | undefined = undefined
  let open = false
  function toggleOptions() {
    open = !open
  }

  const dispatch = createEventDispatcher<{
    view: typeof nft
    sellClick: typeof nft
    delist: string
    transferClick: typeof nft
  }>()

  function view() {
    open = false
    goto(`/collections/${nft.contract.address}/${nft.token.id}`)
    dispatch('view', nft)
  }

  function delist() {
    open = false
    dispatch('delist', nft.id)
  }

  function sellClick() {
    open = false
    dispatch('sellClick', nft)
  }

  function transferClick() {
    open = false
    dispatch('transferClick', nft)
  }

  $: isCollectionVerified = $marketplace.verifiedContracts.includes(
    nft.contract.address.toLowerCase()
  )
  $: normalizedPrice =
    nft.price && nft.fungible
      ? Big(nft.price).div(10 ** nft.fungible.decimals)
      : '0'
  $: name = nft.token.name ?? nft.contract.symbol + ' ' + nft.token.id
  $: collectionLink = `/collections/${nft.contract.address}`
  $: tokenLink = `/collections/${nft.contract.address}/${nft.token.id}`
</script>

<article class="group flex flex-col w-full relative {className}">
  <a href={tokenLink}>
    <img
      src="https://test-api.zilkroad.io/nfts/images/{nft.contract.address}/{nft
        .token.id}?network=https://dev-api.zilliqa.com"
      alt="Nft"
      class="object-cover w-full h-auto rounded-lg bg-zilkroad-gray-darker"
      width="100"
      height="100"
    />
    <h1 class="flex items-center mt-5 text-xl font-medium">
      {#if isCollectionVerified}<Checkmark className="mr-[10px]" />{/if}
      {name}
    </h1>
  </a>

  <a href={collectionLink}>
    <h2 class="mt-2 font-light text-zilkroad-gray-lighter">
      {nft.contract.name}
    </h2>
  </a>

  {#if nft.price}
    <h3 class="font-light flex items-center">
      <img
        src="https://meta.viewblock.io/zilliqa.zil1gvr0jgwfsfmxsyx0xsnhtlte4gks6r3yk8x5fn/logo?t=dark"
        class="w-4 h-4 mr-2.5"
        alt="logo"
      />{normalizedPrice}
      {nft.fungible.symbol}
    </h3>
  {/if}

  {#if listedOrOwned}
    <button
      class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-white bg-black rounded-lg md:hidden md:group-hover:flex"
      class:open
      on:click={toggleOptions}><Elipsis /></button
    >
  {/if}

  {#if open}
    <div transition:slide class="absolute p-5 w-full bg-gray-900 rounded-lg">
      <div
        class="flex items-center pb-3.5 border-gray-800 border-b justify-between"
      >
        <h6 class="font-semibold text-zilkroad-gray-light">Options</h6>
        <button
          class="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg"
          on:click={toggleOptions}><Cross /></button
        >
      </div>
      <ul class="space-y-2.5 font-normal mt-5 text-zilkroad-gray-light">
        <li
          class="flex items-center space-x-5 align-middle cursor-pointer"
          on:click={view}
        >
          <MagnifiyingGlass /><button>View NFT</button>
        </li>

        {#if listedOrOwned === 'listed'}
          <li
            class="flex items-center space-x-5 cursor-pointer"
            on:click={delist}
          >
            <Trash /><button>Remove listing</button>
          </li>
        {/if}

        {#if listedOrOwned === 'owned'}
          <li
            class="flex items-center space-x-5 align-middle cursor-pointer"
            on:click={sellClick}
          >
            <MoneyBill /><button>Sell</button>
          </li>
          <!-- <li
            class="flex items-center space-x-5 align-middle cursor-pointer"
            on:click={transferClick}
          >
            <LeftRightArrows /><button>Transfer</button>
          </li> -->
        {/if}
      </ul>
    </div>
  {/if}
</article>
