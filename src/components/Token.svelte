<script lang="ts">
  export let tokenType: string
  export let value = 0

  let validFilename = false

  function numberWithCommas(number) {
    const formattedNumber = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'USD'
    }).format(number)
    return number
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
    case 'ZWETH':
      validFilename = true
      break
    case 'ZWUSDT':
      validFilename = true
      break
    case 'ZIL':
      validFilename = true
      break
    default:
  }
</script>

<p class="flex items-center">
  {#if validFilename}
    <img
      src='/images/tokens/{tokenType.toUpperCase()}.png'
      alt=''
      class="mr-[10px] w-4 h-4 max-w-4"
    />
  {/if}
    {numberWithCommas(value)}
    <span class="lg:hidden"> {tokenType}</span>
</p>
