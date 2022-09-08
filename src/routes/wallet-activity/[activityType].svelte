<script context="module">
  export async function load({ params, fetch }) {
    const supportedActivityTypes = ['royalties', 'buyers', 'sellers']
    const { activityType } = params
    // If the url does not match one of our supported types then 404
    if (supportedActivityTypes.indexOf(activityType) === -1) {
      return { status: 404 }
    }
    const [wallets] = await Promise.all([
      fetch(`/wallet-activity/wallets.json?type=${activityType}`).then((r) => r.json())
    ])
    return {
      props: { wallets, activityType, supportedActivityTypes }
    }
  }
</script>

<script>
  import WalletActivityCardList from '../../lib/WalletActivityCardList/index.svelte'
  import ShapeImage from '../../components/ShapeImage.svelte'
  import AdBanner from '../../components/AdBanner.svelte'

  export let activityType = ''
  export let title
  export let tableTitle
  export let description
  export let supportedActivityTypes = []
  export let wallets = []

  if (activityType === supportedActivityTypes[0]) {
    title = 'NFT Royalties'
    tableTitle = 'All Royalties'
    description =
      'Below are the wallets that have earned royalties through their contracts. These wallets are currently the top rated for earning the most royalties.'
  } else if (activityType === supportedActivityTypes[1]) {
    title = 'Zilkroad Buyer Wallets'
    tableTitle = 'All Buyers'
    description =
      'Below are the wallets that have bought the most NFTs. These wallets are currently the top rated for buying in descending order.'
  } else if (activityType === supportedActivityTypes[2]) {
    title = 'Zilkroad Seller Wallets'
    tableTitle = 'All Sellers'
    description =
      'Below are the wallets that have listed the most NFTs. They have sold the most NFTs in descending order.'
  }
</script>

<ShapeImage />

<div class="flex flex-col h-full my-40 space-y-5 md:items-center">
  <div class="max-w-screen-xl mx-5 xl:mx-auto xl:px-0 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense">
    <section class="mr-5 lg:col-start-1">
      <h1 class="mt-5 text-4xl font-medium md:text-5xl">{title}</h1>
      <p class="pt-5 font-light text-white">
        {description}
      </p>
    </section>
  </div>
</div>

<main class="space-y-28">
  <div class="mx-auto max-w-screen-xl">
    <h2>{tableTitle}</h2>
    <WalletActivityCardList {wallets} />
  </div>
  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>
