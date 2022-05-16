<script>
  import { slide } from 'svelte/transition'
  import ConnectWallet from '../ConnectWallet.svelte'
  import Searchbox from '../Searchbox.svelte'
  
</script>

<div transition:slide class="absolute flex flex-col w-full px-5 pb-10 space-y-10 bg-black">
  <div class="flex flex-col w-full mt-10 space-y-5">
    <ConnectWallet />
    <Searchbox />
  </div>
  <a class=" text-zilkroad-gray-light" href="/">Home</a>
  <a class=" text-zilkroad-gray-light" href="/">Collections</a>
  <a class=" text-zilkroad-gray-light" href="/marketplace">Marketplace</a>
</div>
