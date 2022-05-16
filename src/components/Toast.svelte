<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { toast } from '$store/toast'
  import ToastItem from './ToastItem.svelte'
</script>

<ul class="fixed z-50 w-full p-0 pl-6 m-0 list-none md:w-auto top-6 right-8">
  {#each $toast as item (item.id)}
    <li in:fly={{ x: 300 }} out:fade animate:flip={{ duration: 200 }}>
      <ToastItem {item} />
    </li>
  {/each}
</ul>
