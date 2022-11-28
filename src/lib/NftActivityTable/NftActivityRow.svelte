<script>
  import TokenPrice from "../../components/TokenPrice.svelte";
  
  export let event = ''
  export let date = 0
  export let seller = ''
  export let buyer = ''
  export let price = 0
  export let priceSymbol = ''
  let formattedDate = new Date(Number(date)).toLocaleDateString('en-GB', { year: '2-digit', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

</script>

<tr>
  <td>{event}</td>
  <td>{formattedDate}</td>
  <td><a class="underline contract" href="/wallet/{seller}">{seller}</a></td>
  <td><a class="underline contract" href="/wallet/{buyer}">{buyer}</a></td>
  <td><div class="flex items-center">
    <img
      src="/images/tokens/{priceSymbol.toUpperCase()}.png"
      class="h-6 w-6 p-0.5"
      alt="..."
    />
    <span class="ml-2"><TokenPrice fungibleAddressOrSymbol={priceSymbol} price={price} reverse="true" /></span>
  </div></td>
</tr>

<style type="postcss">
  td {
    @apply p-4 px-6 text-white align-middle border-t-0 whitespace-nowrap;
  }
</style>