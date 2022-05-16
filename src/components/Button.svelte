<script lang="ts">
import { createEventDispatcher } from "svelte"

  export let className = ''
  export let textColor = 'text-zilkroad-gray-medium'
  export let dark = false
  const dispatch = createEventDispatcher<{ click: undefined }>()
</script>

<button
  on:click={() => dispatch('click')}
  class:bg-white={!dark}
  class:bg-zilkroad-gray-dark={dark}
  class="py-[14px] md:px-5 flex items-center justify-center rounded-lg {textColor} leading-[19.36px] {className}"
>
  <slot />
</button>
