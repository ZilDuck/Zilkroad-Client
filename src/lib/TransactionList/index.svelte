<script>
  import { fade, fly } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import { transaction } from '$store/transaction'
  import Transaction from './Transaction.svelte'
</script>

<ul class="w-full py-4 m-0 list-none md:w-auto">
  {#each $transaction as item (item.id)}
    <li in:fly={{ x: 300 }} out:fade animate:flip>
      <Transaction {item} />
    </li>
  {/each}
</ul>