<script>
  import TokenPrice from "../../components/TokenPrice.svelte";

  export let eventType = '-'
  export let date = '-'
  export let tokenId = 0
  export let nftContract = 0
  export let price = '-'
  export let priceSymbol = '-'
  export let royalty
  export let output
  export let taxAmount
  export let network = 'testnet'
  export let txHash = ''
  const viewblockURL = 'https://viewblock.io/zilliqa/tx'

  const isSale = eventType === 'Bought' || eventType === 'Sold'
  const isRoyalties = eventType === 'Royalties'
</script>

<tr class="space-x-6 space-y-4">
  <td>
    {eventType}
  </td>  
  <td>
    <a class="underline" href="{viewblockURL}/{txHash}?network={network}">{date}</a>
  </td>  
  <td>
    <a class="underline" href="/collections/{nftContract}/{tokenId}">{tokenId}</a>
  </td>  
  <td>
    <a class="underline contract" href="/collections/{nftContract}">{nftContract}</a>
  </td>  
  <td>
      <div class="flex items-center">
        {#if !isRoyalties}
        <img
          src="/images/tokens/{priceSymbol.toUpperCase()}.png"
          class="h-6 w-6 p-0.5"
          alt="..."
        />
        <span class="ml-2"><TokenPrice price={price} fungibleAddressOrSymbol={priceSymbol} reverse="false" /></span>
        {:else}
        <span class="ml-2 ">-</span>
        {/if}
      </div>
  </td>  
  <td>
      <div class="flex items-center">
        {#if royalty > 0}
        <img
          src="/images/tokens/{priceSymbol.toUpperCase()}.png"
          class="h-6 w-6 p-0.5"
          alt="..."
        />
        <span class="ml-2"><TokenPrice price={royalty} fungibleAddressOrSymbol={priceSymbol} reverse="false" /></span>
        {:else}
        <span class="ml-2">-</span>
        {/if}
      </div>
  </td>
  <td>
      <div class="flex items-center">
        {#if output && isSale}
        <img
          src="/images/tokens/{priceSymbol.toUpperCase()}.png"
          class="h-6 w-6 p-0.5"
          alt="..."
        />
        <span class="ml-2 contract"><TokenPrice price={taxAmount} fungibleAddressOrSymbol={priceSymbol} reverse="false" /></span>
        {:else}
        <span class="ml-2">-</span>
        {/if}
      </div>
  </td>
  <td>
      <div class="flex items-center">
        {#if output && isSale}
        <img
          src="/images/tokens/{priceSymbol.toUpperCase()}.png"
          class="h-6 w-6 p-0.5"
          alt="..."
        />
        <span class="ml-2 contract"><TokenPrice price={output} fungibleAddressOrSymbol={priceSymbol} reverse="false" /></span>
        {:else}
        <span class="ml-2">-</span>
        {/if}
      </div>
  </td>
</tr>

<style>
  td {
    @apply p-4 px-6 text-white align-middle border-t-0 whitespace-nowrap;
  }
</style>