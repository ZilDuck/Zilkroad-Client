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
  import ContractActivityRow from '../../lib/ContractActivityTable/ContractActivityRow.svelte'

  export let collections = []
</script>

<ShapeImage />
<PageHeader title="View collections" description="View all of the collections that are available on Zilkroad." />

<main class="max-w-screen-xl mx-5 xl:mx-auto mt-40">
  <div class="mb-[120px] space-y-5">
    <CollectionSectionList {collections} />
  </div>
  <AdBanner className="md:mx-auto max-w-screen-xl" />
  {#if data.length > 0}
  {#each data as row}
    <NftActivityRow event={row.activity} date={row.unixtime} wallet={row.contract} price={row.price} priceSymbol={row.price_symbol}/>
  {/each}
{:else}
  <tr>
    <td colspan={headers.length} class="">
      <div class="flex flex-col justify-center items-center pb-5">
        <img
          src="/icons/Outline/General/Moon.svg"
          alt="No sales history"
          class="fill-white max-w-[24px] mb-[10px]"
        />
        <p class="text-[14px]">There is no sale history for this NFT yet</p>
      </div>
    </td>
  </tr>
{/if}
</main>
