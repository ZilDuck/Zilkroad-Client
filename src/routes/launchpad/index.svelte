<script context="module">
  export async function load({ fetch }) {
    const [featuredMintableCollection, newlyMintableCollections, endingMintableCollections] = await Promise.all([
      fetch(`/launchpad/collection.json`).then((r) => r.json()),
      fetch(`/launchpad/collections.json?type=new`).then((r) => r.json()),
      fetch(`/launchpad/collections.json?type=ending`).then((r) => r.json())
    ])
    return {
      props: {
        featuredMintableCollection,
        newlyMintableCollections,
        endingMintableCollections
      }
    }
  }
</script>

<script>
  import MintNftCardList from '../../lib/MintNftCardList/index.svelte'
  import Header from '../../components/Header.svelte'
  import FeaturedMintNftCard from '../../lib/MintNftCardList/FeaturedMintNftCard.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'

  export let featuredMintableCollection = {}
  export let newlyMintableCollections = []
  export let endingMintableCollections = []
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div
  class="max-w-screen-xl mx-5 mt-5 xl:mx-auto lg:mt-24 xl:mt-32 xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense"
>
  <img
    class="w-full mb-10 lg:mb-0 lg:h-fit rounded-lg lg:col-start-2"
    src="https://i.pickadummy.com/600x400?cache={featuredMintablecollection.contract_address_b16}"
    alt="{featuredMintableCollection.name} hero"
    width="400"
    height="300"
  />
  <section class="lg:mr-24 lg:col-start-1">
    <FeaturedMintNftCard collection={featuredMintableCollection} />
  </section>
</div>

<main class="max-w-screen-xl mx-5 xl:mx-auto  mt-20 space-y-5">
  <h2 class="text-2xl font-semibold pb-5">Mintable collections</h2>
  <MintNftCardList collections={newlyMintableCollections} />
</main>
