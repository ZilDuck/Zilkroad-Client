<script context="module">
  export async function load({ url, fetch }) {
    const [featuredNfts, recentlyListedNfts, recentlySoldNfts, featuredCollections, wallets] = await Promise.all([
      fetch(`/nfts.json?type=featured`).then((r) => r.json()),
      fetch(`/nfts.json?type=recentlyListed`).then((r) => r.json()),
      fetch(`/nfts.json?type=recentlySold`).then((r) => r.json()),
      fetch(`/collections.json?type=featured`).then((r) => r.json()),
      fetch(`/wallets.json`).then((r) => r.json())
    ])
    console.log( featuredNfts,
        recentlyListedNfts,
        recentlySoldNfts,
        featuredCollections,
        wallets)
    return {
      props: {
        featuredNfts,
        recentlyListedNfts: recentlyListedNfts.nfts,
        recentlySoldNfts,
        featuredCollections,
        wallets
      }
    }
  }
</script>

<script>
  import Button from '$components/Button.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import CallToActionSection from '$components/CallToActionSection.svelte'
  import Header from '$components/Header.svelte'
  import JoinDiscord from '$components/JoinDiscord.svelte'
  import ScrollableSection from '$components/ScrollableSection.svelte'
  import NftCardList from '../lib/NftCardList/index.svelte'
  import CollectionCardList from '../lib/CollectionCardList/index.svelte'
  import WalletActivityList from '../lib/WalletActivityList/index.svelte'

  export let featuredNfts = []
  export let recentlyListedNfts = []
  export let recentlySoldNfts = []
  export let featuredCollections = []
  export let wallets = []
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40 mx-5">
  <h1
    class="text-center text-5xl leading-[1.25] md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]"
  >
    A marketplace for free NFT trading
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white">
    That’s right. We’re a 0% fees trading platform.
  </p>
  <Button>Explore collections</Button>
</div>

<main class="mt-[-7.5%] xl:mt-[-144px] space-y-28 mx-5">
  <ScrollableSection className="md:grid-cols-4">
    <NftCardList nfts={featuredNfts} />
  </ScrollableSection>

  <CallToActionSection className="md:mx-auto max-w-screen-xl" />

  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-2xl font-medium">Popular NFTs</h2>
    <ScrollableSection className="mt-10 grid-cols-4">
      <NftCardList nfts={recentlyListedNfts} />
    </ScrollableSection>
  </div>

  <div class="mx-auto max-w-screen-xl">
    <h2 class="text-2xl font-medium">Recently sold</h2>
    <ScrollableSection className="mt-10 grid-cols-6">
      <NftCardList nfts={recentlySoldNfts} />
    </ScrollableSection>
  </div>

  <div class="mx-auto max-w-screen-xl">
    <div class="pb-10 flex justify-between">
      <h2 class="text-2xl font-medium">Top weekly wallet activity</h2>
      <a href="/wallet-activity" class="text-white underline">View all wallet activity</a>
    </div>
    <p class="text-white pb-5">Top royalty earners</p>
    <!-- <WalletActivityList {wallets} /> -->
  </div>

  <CallToActionSection
    className="md:mx-auto max-w-screen-xl"
    title="View NFT launches"
    description="View new NFT launches at the launchpad and mint new NFTs that are exclusive to Zilkroad. Get minting some new NFTs with our curated partners."
    buttonText="Go to the launchpad"
    backgroundImage=""
  />

  <JoinDiscord className="mx-auto max-w-screen-xl" />
</main>
