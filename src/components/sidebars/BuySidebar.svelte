<script>
  import { fly } from 'svelte/transition'
  import marketplace from '$store/marketplace'
  import SvgLoader from '$components/SvgLoader.svelte'
  import TokenPrice from "../TokenPrice.svelte";

  export let isLoading = false
  export let sellPrice = 0
  export let sellFungible
  export let closeListModal
  export let buy
  export let imageSrc
  export let name

  let checkOne = false
  let checkTwo = false
  let sellFungibleLabel 

  let fungibles = $marketplace.approvedFungibles.filter((fungible) => fungible.fungible_address !== '')
  let collections = fungibles.map((fungible) => {
    return {
      value:fungible.fungible_address,
      label: fungible.fungible_symbol
    }
  } )
  let value = collections[0]
  sellFungible =collections[0].value
  sellFungibleLabel = collections[0].label
  
</script>

<h4 class="text-[20px] font-[600] mb-5">{name}</h4>
<img src={imageSrc} alt="NFT image you're selling" class="w-full pb-5" />
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total price <span class="text-white"><TokenPrice price={sellPrice} fungibleAddressOrSymbol={sellFungible} reverse="false" />
</span>
</p>
<p class="mb-5">All purchases are final, and includes all royalties and fees for purchasing the NFT above.</p>
<label class="block text-white mb-5">
  <input type="checkbox" bind:checked={checkOne} />
  Option one?
</label>
<label class="block text-white mb-5">
  <input type="checkbox" bind:checked={checkTwo} />
  Option two?
</label>
<button
  class="text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5"
  on:click={closeListModal}
  >Cancel
</button>
<button
  class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
  on:click={buy}
  disabled={isLoading || !checkOne || !checkTwo}
  ><span class="mr-[10px] text-zilkroad-text-light">Approve and purchase for</span>
  <TokenPrice price={sellPrice} fungibleAddressOrSymbol={sellFungible} reverse="false" />
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
