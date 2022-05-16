<script>
  export let currencies = []
  export let wallets = []
</script>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-x-3 lg:gap-x-0 gap-y-3">
  <div class="flex flex-auto hidden lg:flex">
    <p class="p-4 lg:w-3/12">Wallet</p>
    <p class="p-4 lg:w-2/12">USD Total</p>
    {#each currencies as currency}
      <p class="p-4 lg:w-2/12">
        <img alt="{currency.name} Token Logo" class="inline w-4" src="/static/images/tokens/{currency.name}.png" />
        {currency.name}
      </p>
    {/each}
    <p class="flex-grow"></p>
  </div>
    {#each wallets as wallet}
      <div class="flex flex-auto flex-col lg:flex-row">
        <p class="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg lg:w-3/12 overflow-x-hidden overflow-ellipsis p-4 bg-gray-900 whitespace-pre">
          <img alt="Wallets Avatar" class="inline w-4 rounded-xl" src="https://i.pickadummy.com/100x100?cache={wallet.address}" />
          {wallet.address}
        </p>
        <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700"/></div>
        <p class="overflow-x-hidden lg:w-2/12 overflow-ellipsis p-4 bg-gray-900">
          <span class="lg:hidden text-gray-400">Total royalties USD <br/></span>
          ${wallet.usdTotal}~
        </p>
        <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700"/></div>
        {#each currencies as currency}
          <p class="overflow-x-hidden lg:w-2/12 overflow-ellipsis p-4 bg-gray-900 whitespace-pre hover:overflow-x-visible">
            <img alt="{currency.name} Token Logo" class="inline w-4" src="/static/images/tokens/{currency.name}.png" />
            {wallet.usdTotal*currency.rate}
            <span class="lg:hidden"> {currency.name}</span>
          </p>
        {/each}
        <p class="flex-grow rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg  pb-3 lg:pr-3 bg-gray-900"></p>
      </div>

    {/each}

</div>