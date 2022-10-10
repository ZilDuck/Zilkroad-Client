<script>
  export let wallet = []
</script>

<div class="flex flex-auto flex-col rounded-lg bg-zilkroad-gray-dark p-5 mb-5">
  <div class="flex align-center pb-5">
    <img
      alt="Wallets Avatar"
      class="inline w-4 rounded-xl self-center"
      src="https://i.pickadummy.com/100x100?cache="
    />
    <a href="/wallet/{wallet.address}" class="text-white pl-[10px] underline overflow-x-hidden overflow-ellipsis">{wallet.address}</a>
  </div>
  <hr class="border-zilkroad-gray-border" />
  <p class="pt-5 ">
    <span class="text-gray-400">Total royalties USD</span>
  </p>
  <p>${wallet.total_usd}~</p>
</div>
