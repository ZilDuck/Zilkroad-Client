<script>
import wallet from "../../store/wallet";
import TokenPrice from "../../components/TokenPrice.svelte";

  export let currencies = [
    {
      name: 'XSGD',
    },
    {
      name: 'zWBTC',
    },
    {
      name: 'wZIL',
    },
    {
      name: 'zUSDT',
    },
    {
      name: 'zETH',
    },
    {
      name: 'gZIL',
    },
    {
      name: 'DUCK'
    }
  ]
  export let wallets = []
  wallets.forEach(cleanWallet)

  function cleanWallet(wallet) {
    for (const [key, value] of Object.entries(wallet)) {
      if ( key != "address"  && key != "total_usd") {
        wallet[key] = parseInt(value, 10)
      }
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-x-3 lg:gap-x-0 gap-y-3">
  <div class="flex flex-auto hidden lg:flex">
    <p class="p-4 lg:w-3/12">Wallet</p>
    <p class="p-4 lg:w-2/12">USD Total</p>
    {#each currencies as currency}
      <p class="p-4 lg:w-2/12">
        <img alt="{currency.name} Token Logo" class="inline w-4" src="/images/tokens/{currency.name.toUpperCase()}.png" />
        {currency.name}
      </p>
    {/each}
    <p class="flex-grow"></p>
  </div>
    {#each wallets as wallet}
      <div class="flex flex-auto flex-col lg:flex-row">
        <p class="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg lg:w-3/12 overflow-x-hidden overflow-ellipsis p-4 bg-gray-900 whitespace-pre">
          <img alt="Wallets Avatar" class="inline w-4 rounded-xl" src="https://i.pickadummy.com/100x100?cache={wallet.address}" />
          <a href="/wallet/{wallet.address}"> {wallet.address} </a>
        </p>
        <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700"/></div>
        <p class="overflow-x-hidden lg:w-2/12 overflow-ellipsis p-4 bg-gray-900">
          <span class="lg:hidden text-gray-400">Total royalties USD <br/></span>
          ${wallet.total_usd}~
        </p>
        <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700"/></div>
        {#each currencies as currency}
          <p class="overflow-x-hidden lg:w-2/12 overflow-ellipsis p-4 bg-gray-900 whitespace-pre hover:overflow-x-visible">
            <img alt="{currency.name} Token Logo" class="inline w-4" src="/images/tokens/{currency.name.toUpperCase()}.png" />
            <span class="ml-2"><TokenPrice price={wallet[currency.name.toLowerCase()]} fungibleAddressOrSymbol={currency.name} reverse="false" /></span>
          </p>
        {/each}
        <p class="flex-grow rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg  pb-3 lg:pr-3 bg-gray-900"></p>
      </div>

    {/each}

</div>
