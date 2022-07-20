<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import Burger from '$icons/Burger.svelte'
  import Zilkroad from '$icons/Zilkroad.svelte'

  const dispatch = createEventDispatcher<{ toggle: undefined }>()
  let handleMegaHide; // TODO: Ask 50 About This - causes handleMegaHide is not defined in browser console
</script>

<nav class="flex items-center justify-between w-full h-16 px-5 md:hidden bg-black">
  <a href="/" class="flex items-center" on:mouseenter={handleMegaHide}>
    <Zilkroad />
    <span class="text-xl lg:block font-medium ml-3"> Zilkroad </span>
  </a>
  <Burger on:click={() => dispatch('toggle')} />
</nav>
