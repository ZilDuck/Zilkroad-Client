<script>
  import MintCount from './MintCount.svelte'

  export let collection = {
    id: 0,
    name: '',
    description: '',
    mintedTotal: 0,
    mintCount: 0
  }

  $: totalMintedPercent = (collection.mintedTotal / collection.mintCount) * 100

  let isHovering = false

  function enter(e) {
    isHovering = true
  }

  function leave(e) {
    isHovering = false
  }
</script>

<div class="grid grid-cols-4 lg:flex lg:h-24 bg-gray-900 rounded-lg" on:mouseenter={enter} on:mouseleave={leave}>
  <div class="m-5 lg:m-0 col-span-4 flex">
    <img
      src="https://i.pickadummy.com/300x300?cache={collection.id}"
      alt={collection.name}
      class="lg:rounded-l-lg w-24"
      width="300"
      height="400"
    />
    <div class="m-5 w-8/12">
      <p class="text-white font-semibold">{collection.name}</p>
      <p class="overflow-x-hidden overflow-ellipsis whitespace-nowrap">
        {collection.description}
      </p>
    </div>
  </div>
  <div class="my-5 lg:m-5 pl-5 lg:w-36 border-r-[1px] lg:border-l-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Count</p>
    <p class="text-white">{collection.mintCount}</p>
  </div>
  <div class="m-5 lg:w-36 border-r-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Price</p>
    <p class="text-white">{collection.mintPrice}</p>
  </div>
  <div class="m-5 lg:w-60 col-span-2">
    <p class="text-zilkroad-text-light">Mint Time</p>
    <p class="text-white">{collection.mintTime}</p>
  </div>
  <div class="p-5 flex-grow col-span-4 hidden lg:block lg:w-64">
    <MintCount
      hoverable
      {isHovering}
      nftToMint={collection.id}
      count={collection.mintCount}
      minted={collection.mintedTotal}
      mintPrice={collection.mintPrice}
    />
  </div>
  <div class="mx-5 py-5 flex-grow col-span-4 lg:hidden border-t-[1px] border-gray-600">
    <MintCount
      nftToMint={collection.id}
      count={collection.mintCount}
      minted={collection.mintedTotal}
      mintPrice={collection.mintPrice}
    />
  </div>
</div>
