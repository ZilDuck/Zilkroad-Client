<script>
  import Select from 'svelte-select'
  import { fly } from 'svelte/transition'
  import SvgLoader from '$components/SvgLoader.svelte'

  export let isLoading = false
  export let sellPrice = 0
  export let closeListModal
  export let list
  export let nft
  export let imageSrc
  export let name

  let SpenderOperator = false

  let collections = [
    { value: 'WZIL', label: 'WZIL' },
    { value: 'XSGD', label: 'XSGD' },
    { value: 'zWBTC', label: 'zWBTC' },
    { value: 'zUSDT', label: 'zUSDT' },
    { value: 'zETH', label: 'zETH' },
    { value: 'GZIL', label: 'GZIL' }
  ]

  let value = collections[1]

  function handleOrder(event) {
    console.log('selected item', event.detail)
    value = event.detail
  }
</script>

<h4 class="text-[20px] font-[600] mb-5">{name}</h4>
<img src={imageSrc} alt="NFT image you're selling" class="w-full pb-5" />
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
      items={collections}
      {value}
      isClearable={false}
      isSearchable={false}
      containerClasses="bg-zilkroad-gray-dark"
      on:select={handleOrder}
    />
  </div>
</div>
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total received<span class="text-white">1098.00 XSGD</span>
</p>
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total after royalties<span class="text-white">1098.00 XSGD</span>
</p>
<label>
  <input type="checkbox" bind:checked={SpenderOperator} />
  Spender/Operator set?
</label>
<button
  class="text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5"
  on:click={closeListModal}
  >Cancel
</button>
<button
  class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
  on:click={list}
  disabled={isLoading || !SpenderOperator}
  >Approve and submit
  {#if isLoading}
    <span in:fly={{ y: -10 }}>
      <SvgLoader />
    </span>
  {/if}
</button>

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
