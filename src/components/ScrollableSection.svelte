<script lang="ts">
  export let className: string
</script>

<section
  class="flex gap-5 hide-scroll-bar overflow-x-scroll md:grid md:max-w-screen-xl md:w-full md:mx-auto md:justify-center md:gap-6 {className}"
>
  <slot />
</section>

<style lang="postcss">
  .hide-scroll-bar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .hide-scroll-bar::-webkit-scrollbar {
    display: none;
  }
</style>
