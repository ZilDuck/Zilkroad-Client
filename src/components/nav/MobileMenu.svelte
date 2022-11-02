<script>
  import { slide } from 'svelte/transition'
  import ConnectWallet from '../ConnectWallet.svelte'
  import Searchbox from '../Searchbox.svelte'
</script>

<div
  transition:slide
  class="fixed flex flex-col w-full px-5 py-5 space-y-10 bg-black border-solid border-t border-t-zilkroad-gray-dark z-[100] absolute"
>
  <a class=" text-zilkroad-gray-light" href="/">Home</a>
  <a class=" text-zilkroad-gray-light" href="/">Collections</a>
  <a class=" text-zilkroad-gray-light" href="/marketplace">Marketplace</a>
  <div><Searchbox /></div>
  <div class="w-full flex"><ConnectWallet full={true} noMargin={true} /></div>
</div>
