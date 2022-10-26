<script type="ts">
  import { variables } from "../variables"
  import UserActivityRow from "./ContractActivityRow.svelte";
  export let data: ContractActivity[]
  let rows = []

  export const { network } = variables
  const headers = ['Event', 'Date', 'NFT Token ID', 'NFT Contract', 'Price', 'NFT Royalty', 'Tax', 'Output']
  const viewblockURL = 'https://viewblock.io/zilliqa/tx'

  if (data) {
    data.forEach((row) => {
      var formattedDate = new Date(Number(row.unixtime)).toLocaleDateString('en-GB', {
        year: '2-digit',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })

      // const output = (Number(row.price) - Number(row.royalty_amount) ?? 0) - Number(row.tax_amount ?? 0)

      rows.push({
        Event: row.activity,
        Date: formattedDate,
        NFTTokenID: row.token_id,
        NFTContract: row.contract,
        Price: row.price,
        PriceSymbol: row.price_symbol,
        NFTRoyalty: row.royalty_amount,
        TaxAmount: row.tax_amount,
        Output: row.output,
        tx_hash: row.tx_hash
      })
    })
  }
</script>

<div class="max-w-screen-xl mx-auto space-y-10 ">
  <h2 class="text-2xl font-medium">Contract Activity</h2>
  <div class="overflow-x-auto border-[1px] border-zilkroad-gray-dark rounded-lg">
    <table class="items-center w-full bg-transparent border-collapse">
      <thead>
        <tr class="bg-zilkroad-gray-dark">
          <!-- Will need formatting -->
          {#each headers as header}
            <th class="px-6 py-3 font-normal text-left text-white align-middle whitespace-nowrap last:rounded-tr-lg first:rounded-tl-lg">{header}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#if rows.length > 0}
          {#each rows as row}
            <UserActivityRow eventType={row.Event} date={row.Date} tokenId={row.NFTTokenID} nftContract={row.NFTContract} price={row.Price} priceSymbol={row.PriceSymbol} royalty={row.NFTRoyalty} taxAmount={row.TaxAmount} output={row.Output} txHash={row.tx_hash} />
          {/each}
        {:else}
        <tr>
          <td class="text-center" colspan={headers.length}>This contract has no activity yet.</td>
        </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<style>
  table td {
    @apply p-4 px-6 text-white align-middle border-t-0 whitespace-nowrap;
  }
</style>
