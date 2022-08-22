<script lang="ts">
  import TokenPrice from "./TokenPrice.svelte";

  export let tokenType: string
  export let value
  export let valueUsd
  export let showTokenType = true

  let validFilename = false

  function numberWithCommas(number) {
    const formattedNumber = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol'
    }).format(number)
    return formattedNumber
  }

  switch (tokenType.toUpperCase()) {
    case 'GZIL':
      validFilename = true
      break
    case 'WZIL':
      validFilename = true
      break
    case 'XSGD':
      validFilename = true
      break
    case 'ZWBTC':
      validFilename = true
      break
    case 'ZETH':
      validFilename = true
      break
    case 'ZUSDT':
      validFilename = true
      break
    case 'ZIL':
      validFilename = true
      break
    case 'DUCK':
      validFilename = true
      break
    default:
  }
</script>

<p class="flex items-start">
  {#if validFilename}
    <img src="/images/tokens/{tokenType.toUpperCase()}.png" alt="" class="mr-[10px] mt-1 w-4 h-4 max-w-4 object-contain" />
  {/if}
  <span>
  {#if value || value === 0}
    {Number(value).toFixed(2)}
  {/if} 
  {#if valueUsd || valueUsd === 0}
    <small class="block -mb-2 text-gray-600 ">≈{numberWithCommas(valueUsd)}</small>
  {/if}
  </span>

  {#if showTokenType}
    <span class="lg:hidden">{tokenType}</span>
  {/if}
</p>
