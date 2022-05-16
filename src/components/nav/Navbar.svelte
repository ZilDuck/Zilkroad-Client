<script lang="ts">
  import ConnectWallet from '../ConnectWallet.svelte'
  import Zilkroad from '$icons/Zilkroad.svelte'
  import Searchbox from '../Searchbox.svelte'
  export let light = false
</script>

<nav
  class="items-center justify-center hidden w-full max-w-screen-xl px-4 py-5 mx-auto space-x-6 md:flex lg:space-x-10 2xl:px-0"
>
  <a href="/" class="flex items-center">
    <Zilkroad />
    <span class="text-xl hidden lg:block font-medium ml-3 leading-[0.8]"> Zilkroad </span>
  </a>
  <a href="/" class="text-zilkroad-gray-lighter font-light lg:!ml-20">Home</a>
  <a href="/collections" class="font-light text-zilkroad-gray-lighter">Collections</a>
  <a href="/marketplace" class="font-light text-zilkroad-gray-lighter">Marketplace</a>
  <a href="/launchpad" class="font-light text-zilkroad-gray-lighter">Launchpad</a>
  <Searchbox className="lg:!ml-auto" />
  <ConnectWallet />
</nav>
