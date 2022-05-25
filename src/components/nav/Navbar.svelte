<script lang="ts">
  import ConnectWallet from '../ConnectWallet.svelte'
  import Zilkroad from '$icons/Zilkroad.svelte'
  import Chevron from '$icons/Chevron.svelte'
  import Searchbox from '../Searchbox.svelte'
  import MegaMenu from './MegaMenu.svelte';
  export let light = false
  let megaMenuShow = false;

  function handleMegaShow() {
    megaMenuShow = true;
  }

  function handleMegaHide() {
    megaMenuShow = false;
  }

</script>

<nav
  class="relative bg-black px-5" on:mouseleave={handleMegaHide} on:blur={handleMegaHide}
>
  <div class="items-center justify-between hidden w-full max-w-screen-xl py-5 lg:mx-auto md:flex 2xl:px-0 ">
    <a href="/" class="flex items-center" on:mouseenter={handleMegaHide}>
      <Zilkroad />
      <span class="text-xl hidden lg:block font-medium ml-3 leading-[0.8]"> Zilkroad </span>
    </a>
    <a href="/" class="text-zilkroad-gray-lighter inline-flex items-center justify-center font-light lg:!ml-20 lg:pl-5 lg:pr-5 h-12 hover:text-white" on:mouseenter={handleMegaHide}>Home</a>
    <a href="/marketplace" class="font-light text-zilkroad-gray-lighter inline-flex items-center justify-center lg:pl-5 lg:pr-5 h-12 hover:text-white" on:mouseenter={handleMegaHide}>Marketplace</a>
    <button class="font-light text-zilkroad-gray-lighter inline-flex items-center justify-center lg:pl-5 lg:pr-5 h-12 hover:text-white" on:mouseenter={handleMegaShow}><span class="mr-2">Explore</span> <Chevron /></button>
    <div on:mouseenter={handleMegaHide} class="flex items-center lg:!ml-auto">
      <Searchbox />
      <ConnectWallet/>
    </div>
  </div>
  {#if megaMenuShow}
    <MegaMenu />
  {/if}
</nav>
