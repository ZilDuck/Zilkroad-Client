<script lang="ts">
  import { createEventDispatcher } from "svelte"
  
    export let className = ''
    export let textColor = 'text-zilkroad-gray-medium'
    export let dark = false
    export let url = 'https://discord.gg/CJbgkYyPXB'
  </script>
  
  <a
    href={url}
    class:bg-white={!dark}
    class:bg-zilkroad-gray-dark={dark}
    class="px-5 h-12 inline-flex items-center justify-center rounded-lg {textColor} {className}"
  >
    <slot />
  </a>
  