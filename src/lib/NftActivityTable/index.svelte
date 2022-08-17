<script type="ts">
  import NftActivityRow from "./NftActivityRow.svelte";

  export let data: NftActivity[]

  const headers = ['Event', 'Date', 'Wallet', 'Price']
</script>

<div class="max-w-screen-xl mx-auto space-y-10">
  <div class="overflow-x-auto border-[1px] border-zilkroad-gray-dark rounded-lg">
    <table class={`items-center w-full bg-transparent border-collapse ${data.length <= 0 ? 'min-h-[272px]' : ''}`}>
      <thead>
      <tr class="bg-zilkroad-gray-dark">
        {#each headers as header}
          <th class="px-6 py-3 font-normal text-left text-white align-middle whitespace-nowrap last:rounded-tr-lg first:rounded-tl-lg">{header}</th>
        {/each}
      </tr>
      </thead>
      <tbody>
      {#if data.length > 0}
        {#each data as row}
          <NftActivityRow event={row.activity} date={row.unixtime} wallet={row.contract} price={row.price} priceSymbol={row.price_symbol}/>
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
