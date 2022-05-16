<script context="module">
  export async function load({ url, fetch }) {
    const [featuredNfts, recentlyListedNfts, recentlySoldNfts, featuredCollections, wallets] = await Promise.all([
      fetch(`/nfts.json?type=featured`).then((r) => r.json()),
      fetch(`/nfts.json?type=recentlyListed`).then((r) => r.json()),
      fetch(`/nfts.json?type=recentlySold`).then((r) => r.json()),
      fetch(`/collections.json?type=featured`).then((r) => r.json()),
      fetch(`/wallets.json`).then((r) => r.json())
    ])
    return {
      props: {
        featuredNfts,
        recentlyListedNfts,
        recentlySoldNfts,
        featuredCollections,
        wallets
      }
    }
  }
</script>

<script>
  import NftCardList from '$lib/NftCardList/index.svelte'
  import Header from '$components/Header.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import ScrollableSection from '$components/ScrollableSection.svelte'

  export let featuredNfts = []
  export let recentlyListedNfts = []
  export let recentlySoldNfts = []
  export let featuredCollections = []
  export let wallets = []
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40">
  <h1
    class="text-4xl sm:text-5xl leading-relaxed md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]"
  >
    The marketplace
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white">View nfts available on the marketplace now.</p>
</div>

<section
  class="flex flex-col items-start max-w-screen-xl px-5 mt-10 space-y-10 xl:mx-auto xl:px-0 md:mt-20 md:grid md:grid-cols-2 md:space-y-0 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
>
  <h3 class="text-xl font-medium md:col-span-2 lg:col-span-3 xl:col-span-4 md:mb-5">
    Showing <span class="text-zilkroad-teal">22</span> items
  </h3>
  <ScrollableSection className="md:grid-cols-4">
    <NftCardList nfts={featuredNfts} />
  </ScrollableSection>
</section>
