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
</script>

<h1 class="text-4xl leading-5 font-semibold  md:text-5xl leading-[1.25]">
  {collection.name}
</h1>

<p class="py-5 font-light text-white">
  {collection.description}
</p>

<div class="grid grid-cols-4  bg-gray-900 rounded-lg">
  <div class="my-5  pl-5 border-r-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Count</p>
    <p class="text-white">{collection.mintCount}</p>
  </div>
  <div class="m-5 border-r-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Price</p>
    <p class="text-white">{collection.mintPrice}</p>
  </div>
  <div class="m-5 col-span-2">
    <p class="text-zilkroad-text-light">Mint Time</p>
    <p class="text-white">{collection.mintTime}</p>
  </div>
  <div class="mx-5 py-5 flex-grow col-span-4 border-t-[1px] border-gray-600">
    <MintCount count={collection.mintCount} minted={collection.mintedTotal} mintPrice={collection.mintPrice} />
  </div>
</div>
