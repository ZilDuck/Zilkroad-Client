<script>
  import Button from '../../components/Button.svelte'

  export let hoverable = false
  export let isHovering = false
  export let nftToMint = 0
  export let count = 0
  export let minted = 0
  export let mintPrice = 0

  function mintNFT() {
    console.log('mint NFT: ' + nftToMint)
  }

  $: totalMintedPercent = (minted / count) * 100
</script>

<div>
  {#if hoverable && isHovering && mintPrice}
    <Button on:click={mintNFT} className="hidden md:flex">Mint NFT for {mintPrice}</Button>
  {:else}
    <p class="text-white pb-2">
      {minted}/{count}
    </p>
    <div class="bg-gray-800 block w-auto rounded-md">
      <div class="bg-gray-300 border-4 rounded-md" style="width: {totalMintedPercent}%" />
    </div>
    {#if !hoverable && mintPrice}
      <div class="pt-5 mt-5 border-t-[1px] border-gray-600">
        <Button on:click={mintNFT} className="block w-full">Mint NFT for {mintPrice}</Button>
      </div>
    {/if}
  {/if}
</div>
