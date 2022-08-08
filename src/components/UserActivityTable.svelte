<script type="ts">
  export let data: UserActivity[]
  let rows = []

  const headers = ['Event', 'Date', 'NFT Token ID', 'NFT Contract', 'Price', 'NFT Royalty', 'Output']

  if (data) {
    data.forEach((row) => {
      var formattedDate = new Date(Number(row.unixtime)).toLocaleDateString('en-GB', { year: '2-digit', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

      const output = Number(row.price) - Number(row.royalty_amount) ?? 0
      const isSale = row.activity == "Buy" || row.activity == "Sell"
      let royaltySection
      if ( isSale ) {
        royaltySection = `<div class="flex items-center">
                <img
                  src="/images/tokens/${row.price_symbol.toUpperCase()}.png"
                  class="h-6 w-6 p-0.5"
                  alt="..."
                />
                <span class="ml-2">${row.royalty_amount ?? 0}</span>
              </div>`
      } else {
        royaltySection = `<div class="flex items-center">
                <span class="ml-2">-</span>
              </div>`
      }
      rows.push({
        Event: row.activity,
        Date: formattedDate,
        'NFT Token ID': row.token_id,
        'NFT Contract': `<a class="underline" href="/collections/${row.contract}">${row.contract}</a>`,
        Price: `<div class="flex items-center">
                <img
                  src="/images/tokens/${row.price_symbol.toUpperCase()}.png"
                  class="h-6 w-6 p-0.5"
                  alt="..."
                />
                <span class="ml-2">${row.price}</span>
              </div>`,
        'NFT Royalty': royaltySection,
        Output: `<div class="flex items-center">
                <img
                  src="/images/tokens/${row.price_symbol.toUpperCase()}.png"
                  class="h-6 w-6 p-0.5"
                  alt="..."
                />
                <span class="ml-2">${output}</span>
              </div>`
      })
    })
  }
</script>

<div class="max-w-screen-xl mx-auto space-y-10 ">
  <h2 class="text-2xl font-medium">Wallet Activity</h2>
  <div class="overflow-x-auto border-[1px] border-zilkroad-gray-dark rounded-lg">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr class="bg-zilkroad-gray-dark">
          <!-- Will need formatting -->
          {#each headers as header}
            <th>{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
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
          <td class="text-center" colspan={headers.length}>You have no activity recorded on Zilkroad</td>
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
