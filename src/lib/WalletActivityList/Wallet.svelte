<script>
  export let wallet
</script>

<div class="flex flex-auto flex-col lg:flex-row">
  <p
    class="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg lg:w-3/12 overflow-x-hidden overflow-ellipsis p-4 bg-gray-900 whitespace-pre"
  >
    <img
      alt="Wallets Avatar"
      class="inline w-4 rounded-xl"
      src="https://i.pickadummy.com/100x100?cache={wallet.address}"
    />
    {wallet.address}
  </p>
  <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700" /></div>
  <p class="overflow-x-hidden lg:w-2/12 overflow-ellipsis p-4 bg-gray-900">
    <span class="lg:hidden text-gray-400">Total royalties USD <br /></span>
    ${wallet.usdTotal}~
  </p>
  <div class="bg-gray-900 px-4 lg:hidden"><hr class="border-gray-700" /></div>
  <p
    class="flex-grow rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg  pb-3 lg:pr-3 bg-gray-900"
  />
</div>
