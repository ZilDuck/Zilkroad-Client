<script type="ts">
  export let data: UserActivity[]
  let rows = []

  const headers = ['Event', 'Date', 'NFT Token ID', 'NFT Contract', 'Price', 'NFT Royalty', 'Output']

  if (data) {
    data.forEach((row) => {
      const months = ['Jan', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const date = new Date(Number(row.unixtime))
      const formattedDate =
        date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getHours() + ':' + date.getMinutes()

      rows.push({
        Event: row.activity,
        Date: formattedDate,
        'NFT Token ID': row.tokenId,
        'NFT Contract': `<a class="underline" href="#">${row.contract}</a>`,
        Price: `<div class="flex items-center">
                <img
                  src="https://cryptologos.cc/logos/zilliqa-zil-logo.svg?v=014"
                  class="h-6 w-6 p-0.5 bg-white rounded-full border"
                  alt="..."
                />
                <span class="ml-2">${row.price}</span>
              </div>`,
        'NFT Royalty': `<div class="flex items-center">
                <img
                  src="https://cryptologos.cc/logos/zilliqa-zil-logo.svg?v=014"
                  class="h-6 w-6 p-0.5 bg-white rounded-full border"
                  alt="..."
                />
                <span class="ml-2">${row.royaltyAmount ?? 0}</span>
              </div>`,
        Output: `<div class="flex items-center">
                <img
                  src="https://cryptologos.cc/logos/zilliqa-zil-logo.svg?v=014"
                  class="h-6 w-6 p-0.5 bg-white rounded-full border"
                  alt="..."
                />
                <span class="ml-2">${row.royaltyAmount ?? 0}</span>
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
        {#each rows as row}
          <tr>
            {#each Object.values(row) as cell}
              <td>{@html cell}</td>
            {/each}
          </tr>
        {/each}
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
