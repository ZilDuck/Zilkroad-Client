<script>
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
  <div class="m-5 mb-0 lg:m-0 col-span-4 flex pb-5 lg:pb-0 border-b border-gray-600 lg:border-b-0">
    <img
      src="https://i.pickadummy.com/300x300?cache={collection.id}"
      alt={collection.name}
      class="rounded-lg lg:rounded-r-none w-24"
      width="300"
      height="400"
    />
    <div class="m-5 w-8/12">
      <p class="text-zilkroad-text-light">{collection.name}</p>
      <p class="overflow-x-hidden overflow-ellipsis whitespace-nowrap">
        {collection.description}
      </p>
    </div>
  </div>
  <div class="my-5 mr-0 lg:mr-5 lg:m-5 pl-5 lg:w-36 border-r-[1px] lg:border-l-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Count</p>
    <p class="">{collection.mintCount}</p>
  </div>
  <div class="m-5 mr-0 lg:mr-5 lg:w-36 border-r-[1px] border-gray-600">
    <p class="text-zilkroad-text-light">Mint Price</p>
    <p class="">{collection.mintPrice}</p>
  </div>
  <div class="m-5  mr-0 lg:mr-5 lg:w-60 col-span-2">
    <p class="text-zilkroad-text-light">Mint Time</p>
    <p class="">{collection.mintTime}</p>
  </div>
</div>
