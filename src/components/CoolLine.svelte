<script lang="ts">
  export let bottom = false
  export let top = false
  export let light = false
  export let className = ''
</script>

<div class={className} class:cool-line-bottom={bottom} class:cool-line-top={top} class:light-line={light} class:dark-line={!light}>
  <slot/>
</div>

<style lang="postcss">
  .light-line {
    @apply border-white;
  }

  .dark-line {
    @apply border-zilkroad-gray-darker;
  }

  .cool-line-bottom {
    @apply border-b;
  }

  .cool-line-top {
    @apply border-t;
  }
</style>