<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import Burger from '$icons/Burger.svelte'
  import Zilkroad from '$icons/Zilkroad.svelte'

  const dispatch = createEventDispatcher<{ toggle: undefined }>()
</script>

<nav class="flex items-center justify-between w-full h-16 px-5 md:hidden bg-black">
  <a href="/" class="flex items-center">
    <Zilkroad />
    <span class="text-xl lg:block font-medium ml-3"> Zilkroad </span>
  </a>
  <Burger on:click={() => dispatch('toggle')} />
</nav>
