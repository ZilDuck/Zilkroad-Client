<script>
  import { onMount } from 'svelte'
  export let activePage

  onMount(() => {
    const currentUrl = document.querySelectorAll(`[href="${activePage}"]`)[0]
    currentUrl.classList.add('active-page')
  })
</script>

<ul>
  <li class="mb-[20px]">
    <a href="/docs/introduction">Introduction</a>
  </li>
  <li>
    <p>Category</p>
    <ul>
      <li>
        <a href="/docs/category/a-page">A Page</a>
      </li>
      <li>
        <a href="/docs/category/b-page">B Page</a>
      </li>
    </ul>
  </li>
  <li>
    <p>Category 2</p>
    <ul>
      <li>
        <a href="/docs/category-2/a-page">A page</a>
      </li>
      <li>
        <a href="/docs/category-2/b-page">B page</a>
      </li>
    </ul>
  </li>
</ul>

<style>
  ul {
  }

  ul ul {
    @apply pl-[20px];
  }
  li {
    @apply text-white text-lg mb-[20px] mb-[10px] mt-[20px] block;
  }
  a {
    @apply text-zilkroad-gray-lighter text-base mb-[10px] block;
  }
  :global(.active-page) {
    @apply bg-zilkroad-gray-dark rounded-lg pl-[20px] pr-[20px] pt-[6px] pb-[6px] ml-[-20px];
  }
  p {
    @apply text-white text-lg mb-[20px];
  }
</style>
