<script>
  import { fly } from 'svelte/transition'
  import Zil from "./icons/Zil.svelte";
  import SvgLoader from "./SvgLoader.svelte";

  export let isLoading = false
  export let sellPrice = 0
  export let closeListModal
  export let list
</script>

<h4 class='text-[20px] font-[600] mb-5'>Item name</h4>
<p class='mb-5 text-zilkroad-text-normal'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
</p>
<img src='/images/nft-image.png' alt="NFT image you're selling" class='w-full pb-5' />
<div class='text-white h-16 flex items-center bg-zilkroad-gray-dark p-5 mb-5 rounded-lg w-full'>
  <input class='text-black' type='text' placeholder={sellPrice} bind:value={sellPrice} />
  <Zil />
  <span class='ml-5'>Convert Zil</span>
</div>
<p class='flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5'>
  Royalties<span class='text-white'>122.00 XSGD - 10%</span>
</p>
<p class='flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5'>
  Total after royalties<span class='text-white'>1098.00 XSGD</span>
</p>
<p class='mb-10 text-zilkroad-text-normal'>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
</p>
<button class='text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5'
        on:click={closeListModal}
>Cancel
</button
>
<button class='text-zilkroad-text-light h-12 flex justify-center items-center bg-white rounded-lg w-full'
        on:click={list} disabled={isLoading}
>Submit
  {#if isLoading}
      <span in:fly={{ y: -10 }}>
        <SvgLoader></SvgLoader>
      </span>
  {/if}
</button
>