<script context="module">
  export async function load({ fetch }) {
    const [collections] = await Promise.all([fetch(`/collections/collections.json`).then((r) => r.json())])
    return {
      props: {
        collections
      }
    }
  }
  
</script>

<script>
  import SvelteSeo from "svelte-seo";
  import CollectionSectionList from '../../lib/CollectionSectionList/index.svelte'
  import PageHeader from '$components/PageHeader.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import AdBanner from '../../components/AdBanner.svelte'

  export let collections = []
</script>

<SvelteSeo
  title="Zilkroad : Collection Stats"
  description="View all of the NFT collections traded on Zilkroad"
  twitter={{
    site: "@zilkroad_dex",
    title: "Zilkroad NFT Marketplace",
    description: "Buy, sell and trade Zilliqa NFTs",
    image: "https://pbs.twimg.com/profile_banners/1456394194650550272/1636067337/1500x500", // replace me
    imageAlt: "Zilkroad NFT Marketplace",
  }}
  openGraph={{
    title: "Zilkroad : Collection Stats",
    description: "View all of the NFT collections traded on Zilkroad",
    url: 'https:/zilkroad.io',
    type: 'website',
    images: [
      {
        url: 'https://pbs.twimg.com/profile_banners/1456394194650550272/1636067337/1500x500', // replace me
        width: 909,
        height: 90,
        alt: 'Zilkroad NFT Marketplace',
      }
     ]
  }}
/>

<ShapeImage />
<PageHeader title="View collections" description="View all of the collections that are available on Zilkroad." />

<main class="max-w-screen-xl mx-5 xl:mx-auto mt-40">
  <div class="mb-[120px] space-y-5">
    <CollectionSectionList {collections} />
  </div>
  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>
