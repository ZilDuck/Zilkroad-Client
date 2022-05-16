<script lang="ts">
  import Big from 'big.js';

  import { createEventDispatcher } from 'svelte'
  import { fly, slide } from 'svelte/transition'
  import Button from './Button.svelte'
  import Cross from './icons/Cross.svelte'
  import SmallDown from './icons/SmallDown.svelte'
  import { getFungibles } from '@zilduck/zilkroad-fungibles'
import wallet from '$store/wallet';

  export let nft: Metadata
  let price = ''
  let isDropdownOpen = false

  export let className = ''
  const dispatch = createEventDispatcher<{
    close: undefined
    sell: Metadata & { price: Big; fungible: Fungible }
  }>()

  const fungibles = getFungibles('https://dev-api.zilliqa.com')

  $: name = nft.token.name ?? nft.contract.symbol + ' ' + nft.token.id

  let selectedFungible = Object.values(fungibles)[0]

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen
  }

  function emitSell() {
    const priceWithDecimals = Big(price).times(10 ** +selectedFungible.decimals)
    dispatch('sell', { ...nft, price: priceWithDecimals, fungible: selectedFungible })
  }
</script>

<aside
  transition:fly={{ x: 576 }}
  class="w-screen min-h-screen fixed bg-black top-0 lg:max-w-xl left-0 bottom-0 right-0 z-10 px-4 py-10 overflow-y-scroll lg:left-auto lg:top-auto lg:px-10 lg:overflow-y-auto {className}"
>
  <div class="flex items-center justify-between">
    <h1 class="text-4xl font-medium">Sell your NFT</h1>
    <button
      on:click={() => dispatch('close')}
      class="w-8 h-8 flex items-center justify-center bg-zilkroad-gray-darker rounded-lg"
      ><Cross /></button
    >
  </div>
  <h2 class="text-2xl font-medium mt-5 lg:mt-10">{name}</h2>
  <img
    class="rounded-lg w-full h-auto bg-zilkroad-gray-dark mt-10 lg:mt-5 mb-10 lg:mb-14"
    width="100"
    height="100"
    src="https://test-api.zilkroad.io/nfts/images/{nft.contract.address}/{nft
      .token.id}?network=https://dev-api.zilliqa.com"
    alt=""
  />
  <label for="price" class="text-white">Price</label>
  <div
    class="flex bg-zilkroad-gray-dark rounded-lg mt-3 py-5"
    class:rounded-br-none={isDropdownOpen}
  >
    <input
      type="number"
      class="bg-transparent px-8 grow text-xl border-r border-zilkroad-gray-medium active:ring-0 text-zilkroad-gray-light"
      min="0"
      bind:value={price}
    />

    <div class="relative pl-6 pr-10 cursor-pointer" on:click={toggleDropdown}>
      <span class="flex items-center justify-center space-x-2">
        <img
          src={selectedFungible.image}
          class="w-5 h-5"
          alt="{selectedFungible.name} icon"
        />
        <p>{selectedFungible.symbol}</p>
        <SmallDown />
      </span>

      {#if isDropdownOpen}
        <ul
          transition:slide
          class="absolute p-4 bg-zilkroad-gray-darker w-full -ml-6 mt-5 rounded-b-lg space-y-2"
        >
          {#each Object.values(fungibles).filter((fungible) => fungible.address !== selectedFungible.address) as fungible}
            <li class="text-white flex items-center" on:click={() => selectedFungible = fungible}>
              <img
                src={fungible.image}
                alt="{fungible.name} icon"
                class="w-5 h-5 mr-2"
              />{fungible.symbol}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>

  <p class="text-zilkroad-gray-light font-light mt-5">
    If your nft sells, you will be transfered the funds on the modal button
    click 'I ack this is how orders are fulfilled.
  </p>

  <Button
    dark={true}
    className="w-full mt-10"
    textColor="text-zilkroad-gray-light">Cancel</Button
  >
  <Button className="w-full mt-5" on:click={emitSell}>Confirm listing</Button>
</aside>
