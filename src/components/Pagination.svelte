<script type="ts">
  import { createEventDispatcher } from 'svelte'

  export let currentPage: number
  export let numPages: number
  export let className = ''
  const dispatch = createEventDispatcher()

  function pageChange(page) {
    dispatch('pageChange', {
      currentPage: page
    })
  }


  $: numberShowlist = getVisiblePagesArray(currentPage, numPages)
  $: numberElipsisList = getPagesThatShowElipsis(currentPage, numPages)


  function getPagesThatShowElipsis(currentPage: number, numPages: number) {
    if (numPages < 7) {
      return []
    }
    if (numPages > 6) {
      switch (currentPage) {
        case 1:
        case 2:
        case 3:
        case numPages:
        case numPages - 1:
          return [3]
        default:
          return [1, numPages]
      }
    }
  }

  function getVisiblePagesArray(currentPage:number, numPages:number) {
    if ( numPages < 7 ) {
      return [1,2,3,4,5,6]
    }
    if ( numPages > 6) {
      switch(currentPage) {
      case 1:
      case 2:
      case 3:
      case numPages:
      case numPages-1:
        return [1,2,3,numPages-1,numPages]
      default:
        return [1, currentPage-1, currentPage, currentPage+1, numPages]
      } 
    }
  }

  function range(size:number, startAt:number = 0):ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
  }
</script>

{#if numPages > 1}
<div class="inline-block px-1 md:px-10 py-2 bg-gray-900 rounded-lg {className}">
  <nav class="flex md:space-x-4">
    <div>
      <p
        on:click={() => {
          (currentPage > 1 ? currentPage-- : currentPage)
          pageChange(currentPage)
        }}
        class='cursor-pointer relative flex items-center justify-center h-8 p-0 mx-1 text-xs font-semibold leading-tight text-white rounded-lg w-14 md:w-16 first:ml-0 hover:bg-gray-800'
      >
        &lt; Prev
      </p>
    </div>
    <ul class="flex flex-wrap h-8 pl-0 overflow-hidden list-none rounded">
      {#each Array.from({ length: numPages }) as _, i}
        <li>
          <p
            on:click={() => {
              (currentPage = i + 1)
              pageChange(currentPage)
            }}
            class:active={i + 1 === currentPage}
            class:hidden={!numberShowlist.includes(i + 1)}
            class:showRightElipsis={numberElipsisList[0] === i + 1}
            class:showLeftElipsis={numberElipsisList[1] === i + 1}
            class='cursor-pointer relative flex items-center justify-center w-6 h-8 p-0 mx-1 text-xs font-semibold leading-tight rounded-lg md:w-8 first:ml-0 hover:bg-gray-800'
          >
            {i + 1}
          </p>
        </li>
      {/each}
    </ul>
    <div>
      <p
        on:click={() => {
          currentPage !== numPages ? currentPage++ : currentPage
          pageChange(currentPage)
        }}
        class='cursor-pointer relative flex items-center justify-center h-8 p-0 mx-1 text-xs font-semibold leading-tight rounded-lg w-14 md:w-16 first:ml-0 hover:bg-gray-800'
      >
        Next &gt;
      </p>
    </div>
  </nav>
</div>
{/if}

<style lang="postcss">
  .active {
    @apply bg-black;
  }
  .showRightElipsis {
    @apply mr-8 md:mr-10;
  }
  .showRightElipsis::after {
    @apply absolute left-8 md:left-11 pointer-events-none content-['•••'];
  }
  .showLeftElipsis {
    @apply ml-8 md:ml-10;
  }
  .showLeftElipsis::after {
    @apply absolute right-8 md:right-11 pointer-events-none content-['•••'];
  }
</style>
