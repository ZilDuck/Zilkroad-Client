<script lang="ts">
import { createEventDispatcher } from "svelte";


  const dispatch = createEventDispatcher<{ click: undefined }>()
</script>

<button class="flex items-center justify-center w-8 h-8 " on:click={() => dispatch('click')}>
  <svg
    width="24"
    height="19"
    viewBox="0 0 24 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="1" fill="white" />
    <rect y="9" width="24" height="1" fill="white" />
    <rect y="18" width="24" height="1" fill="white" />
    <rect width="24" height="1" fill="white" />
    <rect y="9" width="24" height="1" fill="white" />
    <rect y="18" width="24" height="1" fill="white" />
  </svg>
</button>
