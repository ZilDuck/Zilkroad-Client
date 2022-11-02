<script>
  export let collection = {
    contract_address_b16: 0,
    contract_address_b32: 0,
    name: '',
    description: '',
    listed: 0,
    minted: 0,
    floor: 0,
    volume: 0,
    royalty: 0,
    royalty_usd: 0,
    count: 0
  }

  export let cdnBaseUrl

  const max_royalty_bps = 10000
  collection.royalty = collection.royalty ? max_royalty_bps / collection.royalty : 0

  $: totalMintedPercent = (collection.mintedTotal / collection.mintCount) * 100

  let isHovering = false

  function enter(e) {
    isHovering = true
  }

  function leave(e) {
    isHovering = false
  }
</script>

<div class="lg:flex lg:h-24 bg-gray-900 rounded-lg" on:mouseenter={enter} on:mouseleave={leave}>
  <div class="m-5 mb-0 lg:m-0 col-span-4 flex pb-5 lg:pb-0 border-b border-gray-600 lg:border-b-0">
    <img
      src="{cdnBaseUrl}/{collection.contract_address_b16}?optimizer=image&width=800"
      alt={collection.name}
      class="rounded-lg lg:rounded-r-none w-24 mt-5 lg:mt-0 object-cover border-gray-900 border"
      width="300"
      height="400"
    />
    <div class="m-5 flex flex-col justify-center">
      <a class="text-white underline" href="/collections/{collection.contract_address_b32}">{collection.name}</a>
      <p class="overflow-x-hidden overflow-ellipsis whitespace-nowrap text-zilkroad-text-light">
        {collection.description}
      </p>
    </div>
  </div>
  <div class="grid grid-cols-4 lg:flex lg:ml-auto">
    <div class="my-5 mr-0 pr-5 pl-5 border-r-[1px] border-gray-600">
      <p class="text-zilkroad-text-light">Listed</p>
      <p class="">{collection.listed || 0}/{collection.minted}</p>
    </div>
    <!-- Commented out whilst Floor price hasn't been fully decided/calculated
    <div class="m-5 mr-0 pr-5 border-r-[1px] border-gray-600">
      <p class="text-zilkroad-text-light">Floor price</p>
      <p class="">{collection.floor || 0} ZIL</p>
    </div> 
    -->
    <div class="m-5 mr-0 pr-5 border-r-[1px] border-gray-600">
      <p class="text-zilkroad-text-light">Volume</p>
      <p class="">${collection.volume || 0} USD</p>
    </div>
    <div class="m-5 mr-0 pr-5 border-r-[1px] border-gray-600">
      <p class="text-zilkroad-text-light">Royalty USD</p>
      <p class="">${collection.royalty_usd || 0}</p>
    </div>
    <div class="m-5 mr-0 pr-5">
      <p class="text-zilkroad-text-light">Royalty %</p>
      <p class="">{collection.royalty || 0}%</p>
    </div>
  </div>
</div>
