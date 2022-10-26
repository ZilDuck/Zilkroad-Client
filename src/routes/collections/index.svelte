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
  import PageHeader from '$components/PageHeader.svelte'
  import ShapeImage from '$components/ShapeImage.svelte'
  import AdBanner from '../../components/AdBanner.svelte'

  export let collections = []
</script>

<ShapeImage />
<PageHeader title="View collections" description="View all of the collections that are available on Zilkroad." />

<main class="max-w-screen-xl mx-5 xl:mx-auto mt-40">
  <div class="mb-[120px] space-y-5">
    <CollectionSectionList {collections} />
  </div>
  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>
