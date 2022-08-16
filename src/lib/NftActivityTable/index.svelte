<script type="ts">
  import marketplace from "$store/marketplace";
  import { convertWithDecimals } from "../fungibles";
  import NftActivityRow from "./NftActivityRow.svelte";

  export let data: NftActivity[]
  let rows = []

  const headers = ['Event', 'Date', 'Wallet', 'Price']

  if (data) {
    data.forEach((row) => {
      var formattedDate = new Date(Number(row.unixtime)).toLocaleDateString('en-GB', { year: '2-digit', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
      rows.push({
        Event: row.activity,
        Date: formattedDate,
        'NFT Contract': `<a class="underline" href="#">${row.contract}</a>`,
        Price: `<div class="flex items-center">
                <img
                  src="/images/tokens/${row.price_symbol.toUpperCase()}.png"
                  class="h-6 w-6 p-0.5"
                  alt="..."
                />
                <span class="ml-2">${convertWithDecimals($marketplace.approvedFungibles, row.price_symbol, row.price, true)}</span>
              </div>`
      })
    })
  }
</script>

<div class="max-w-screen-xl mx-auto space-y-10">
  <div class="overflow-x-auto border-[1px] border-zilkroad-gray-dark rounded-lg">
    <table class={`items-center w-full bg-transparent border-collapse ${rows.length <= 0 ? 'min-h-[272px]' : ''}`}>
      <thead>
      <tr class="bg-zilkroad-gray-dark">
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
      </thead>
      <tbody>
      {#if data.length > 0}
        {#each data as row}
          <NftActivityRow event={row.activity} date={row.unixtime} wallet={row.contract} price={row.price} priceSymbol={row.price_symbol}/>
          {/each}
        {/if}
      {#if rows.length > 0}
        {#each rows as row}
      
          <tr>
            {#each Object.values(row) as cell}
              <td>{@html cell}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan={headers.length} class="">
            <div class="flex flex-col justify-center items-center pb-5">
              <img
                src="/icons/Outline/General/Moon.svg"
                alt="No sales history"
                class="fill-white max-w-[24px] mb-[10px]"
              />
              <p class="text-[14px]">There is no sale history for this NFT yet</p>
            </div>
          </td>
        </tr>
      {/if}
      </tbody>
    </table>
  </div>
</div>

<style type="postcss">
  table th {
    @apply px-6 py-3 font-normal text-left text-white align-middle whitespace-nowrap last:rounded-tr-lg first:rounded-tl-lg;
  }
  table td {
    @apply p-4 px-6 text-white align-middle border-t-0 whitespace-nowrap;
  }
</style>
