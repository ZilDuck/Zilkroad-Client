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
  import CollectionSectionList from '../../lib/CollectionSectionList/index.svelte'
  import Header from '../../components/Header.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'

  export let collections = []
</script>

<ShapeImage />
<Header className="bg-liquid-metal bg-cover bg-center" light={true} />
<div class="flex flex-col h-full mt-20 space-y-5 md:items-center md:mt-40">
  <h1
    class="text-4xl sm:text-5xl leading-relaxed md:text-[80px] font-medium max-w-3xl md:text-center md:leading-[1.25]"
  >
    View collections
  </h1>
  <p class="text-xl font-light text-zilkroad-gray-light md:text-white">
    View all of the collections that are available on Zilkroad.
  </p>
</div>

<main class="max-w-screen-xl mx-5 xl:mx-auto mt-40 space-y-5">
  <CollectionSectionList {collections} />
</main>
