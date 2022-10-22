<script>
  import Select from 'svelte-select'
  import { fly } from 'svelte/transition'
  import SvgLoader from '$components/SvgLoader.svelte'
  import marketplace from '$store/marketplace'
  import { hasSpender } from '../../zilpay/nonfungible'
  import { onMount } from 'svelte'

  export let isLoading = false
  export let sellPrice = 0
  export let sellFungible
  export let closeListModal
  export let list
  export let approve
  export let imageSrc
  export let name
  export let tokenContract
  export let tokenID

  let spenderButtonText = 'Approve'
  let nftHasSpender = false
  onMount(async () => {
    nftHasSpender = await hasSpender(tokenContract, tokenID)
    if (nftHasSpender) {
      spenderButtonText = 'Approved'
    }
  })

  let fungibles = $marketplace.approvedFungibles.filter((fungible) => fungible.fungible_address !== '')
  let fungiblesSelect = fungibles.map((fungible) => {
    return {
      value: fungible.fungible_address,
      label: fungible.fungible_symbol
    }
  })

  let value = fungiblesSelect[0]
  sellFungible = fungiblesSelect[0].value
  function handleOrder(event) {
    console.log('selected item', event.detail)
    value = event.detail
    sellFungible = event.detail.value
  }
</script>

<h4 class="text-[20px] font-[600] mb-5">{name}</h4>
<img src={imageSrc} alt="NFT you're selling" class="w-full pb-5" />
<div
  class="text-white bg-zilkroad-gray-dark p-5 mb-5 rounded-lg w-full flex max-w-full flex-nowrap flex-row justify-between items-center h-auto
"
>
  <input
    class="bg-transparent text-white text-xl flex-grow mr-5 p-[10px]"
    type="text"
    placeholder={sellPrice}
    bind:value={sellPrice}
  />
  <div class="select-field w-40">
    <Select
      items={fungiblesSelect}
      {value}
      isClearable={false}
      isSearchable={false}
      containerClasses="bg-zilkroad-gray-dark"
      on:select={handleOrder}
    />
  </div>
</div>
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total received<span class="text-white">{sellPrice} {value.label}</span>
</p>
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total after royalties<span class="text-white">{sellPrice} {value.label}</span>
</p>
<div class="space-y-5">
  <button
    class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
    on:click={approve}
    disabled={isLoading || nftHasSpender}
    >{spenderButtonText}
    {#if isLoading}
      <span in:fly={{ y: -10 }}>
        <SvgLoader />
      </span>
    {/if}
  </button>
  <button
    class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
    on:click={list}
    disabled={isLoading || !nftHasSpender}
    >List
    {#if isLoading}
      <span in:fly={{ y: -10 }}>
        <SvgLoader />
      </span>
    {/if}
  </button>
  <button
    class="text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5 md:hidden"
    on:click={closeListModal}
    >Cancel
  </button>
</div>

<style type="text/scss">
  .select-field {
    --border: 0px;
    --borderRadius: 8px;
    --background: #000;
    --height: 48px;

    --inputColor: #fff;
    --inputFontSize: 16px;

    --listBackground: #000;
    --listBorder: 1px solid #656565;
    --listBorderRadius: 8px;
    --listEmptyPadding: 12px;

    --itemColor: #fff;
    --itemHoverBG: #1a1a1a;
    --itemHoverColor: #fff;
    --itemIsActiveColor: #fff;

    --placeholderColor: #cbcbcb;

    --multiItemActiveColor: #fff;
    --itemIsActiveColor: #fff;
  }
</style>
