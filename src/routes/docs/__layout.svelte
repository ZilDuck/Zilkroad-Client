<script context="module">
  export async function load({ url }) {
    const activePage = url.pathname
    return {
      props: {
        activePage
      }
    }
  }
</script>

<script>
  import Navigation from './Navigation.svelte'
  import Header from '../../components/Header.svelte'
  import Content from './Content.svelte'

  export let activePage
</script>

<Header />

<main
  class="mt-10 text-white items-center justify-space-between hidden w-full max-w-screen-xl px-4 py-5 mx-auto space-x-6 md:flex lg:space-x-10 2xl:px-0"
>
  <div title="2 Column Layout" class="container mx-auto grid grid-cols-12">
    <div title="Navigation" class="col-span-3">
      <div class="grid-inner w-8/12">
        <Navigation {activePage} />
      </div>
    </div>

    <div title="Main Content" class="docs-layout col-span-8">
      <Content>
        <slot />
      </Content>
    </div>
  </div>
</main>
