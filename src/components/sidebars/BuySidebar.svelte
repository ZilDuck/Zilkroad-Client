<script>
  import { fly } from 'svelte/transition'
  import SvgLoader from '$components/SvgLoader.svelte'
  import TokenPrice from "../TokenPrice.svelte";
  import wallet from "$store/wallet";
  import { convertWithDecimals } from "../../lib/fungibles";
  import marketplace from "../../store/marketplace";

  export let isLoading = false
  export let sellPrice = 0
  export let buyFungible
  export let buyFungibleSymbol
  export let closeListModal
  export let buy
  export let increaseAllowance
  export let imageSrc
  export let name

  let walletHasFunds = false
  let marketplaceHasAllowance = false
  
  console.log($wallet.balances)
  
  const checkWalletForFunds = () => {
    const walletAmount = $wallet.balances[`${buyFungibleSymbol.toLowerCase()}_amount`]
    const convertedSellPrice = convertWithDecimals($marketplace.approvedFungibles, buyFungibleSymbol, sellPrice, true)
    if( walletAmount >= convertedSellPrice) {
      walletHasFunds = true
    }
  }
  
  const checkMarketplaceAllowanceForFunds = async () => {
    const buyFungibleAllowance = Number($wallet.balances[`${buyFungibleSymbol.toLowerCase()}_allowance`])
    const convertedSellPrice = Number(convertWithDecimals($marketplace.approvedFungibles, buyFungibleSymbol, sellPrice, true))
    if (buyFungibleAllowance >= convertedSellPrice) {
      marketplaceHasAllowance = true
    }
  }
  
  
</script>

<h4 class="text-[20px] font-[600] mb-5">{name}</h4>
<img src={imageSrc} alt="NFT you're selling" class="w-full pb-5" />
<p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
  Total price <span class="text-white"><TokenPrice price={sellPrice} fungibleAddressOrSymbol={buyFungibleSymbol} reverse="false" />
</span>
</p>
<p class="mb-5">All purchases are final, and includes all royalties and fees for purchasing the NFT above.</p>
<label class="block text-white mb-5 hidden">
  <input type="checkbox" bind:checked={walletHasFunds} on:load={checkWalletForFunds()}/>
  Wallet has funds?
</label>
<label class="block text-white mb-5 hidden">
  <input type="checkbox" bind:checked={marketplaceHasAllowance} on:load={checkMarketplaceAllowanceForFunds()}/>
  Marketplace has allowance?
</label>
<button
  class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
  on:click={increaseAllowance}
  disabled={isLoading || !walletHasFunds || marketplaceHasAllowance}
  >Increase Allowance
</button>
<button
  class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full disabled:cursor-not-allowed disabled:opacity-50"
  on:click={buy}
  disabled={isLoading || !walletHasFunds || !marketplaceHasAllowance}
  ><span class="mr-[10px] text-zilkroad-text-light">Purchase for</span>
  <TokenPrice price={sellPrice} fungibleAddressOrSymbol={buyFungibleSymbol} reverse="false" />
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
