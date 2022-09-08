<script context="module">
  export async function load({ fetch }) {
    const supportedActivityTypes = ['royalties', 'buyers', 'sellers']
    // If the url does not match one of our supported types then 404
    const [buyerWallets, sellerWallets, royaltyWallets] = await Promise.all([
      fetch(`/wallet-activity/wallets.json?type=buyers`).then((r) => r.json()),
      fetch(`/wallet-activity/wallets.json?type=sellers`).then((r) => r.json()),
      fetch(`/wallet-activity/wallets.json?type=royalties`).then((r) => r.json())
    ])
    return {
      props: {
        buyerWallets,
        sellerWallets,
        royaltyWallets,
        supportedActivityTypes
      }
    }
  }
</script>

<script>
  import WalletActivityCardList from '../../lib/WalletActivityCardList/index.svelte'
  import ShapeImage from '../../components/ShapeImage.svelte'
  import AdBanner from '../../components/AdBanner.svelte'

  export let title = 'Wallet Activity'
  export let description = `Welcome to an overview of wallet activity of Zilliqa. Below you'll find the top rated wallets in their respective categories.`
  export let buyerWallets = []
  export let sellerWallets = []
  export let royaltyWallets = []
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

<main class="space-y-16 mx-5">
  <div class="mx-auto max-w-screen-xl">
    <div class="flex">
      <h2 class="flex-1">Top royalty earners</h2>
      <a class="justify-end" href="/wallet-activity/royalties">View all royalty wallets</a>
    </div>
    <WalletActivityCardList wallets={royaltyWallets} />
  </div>

  <div class="mx-auto max-w-screen-xl">
    <div class="flex">
      <h2 class="flex-1">Top seller wallets</h2>
      <a href="/wallet-activity/sellers">View all sellers</a>
    </div>
    <WalletActivityCardList wallets={sellerWallets} />
  </div>

  <div class="mx-auto max-w-screen-xl">
    <div class="flex">
      <h2 class="flex-1">Top buyer wallets</h2>
      <a href="/wallet-activity/buyers">View all buyers</a>
    </div>
    <WalletActivityCardList wallets={buyerWallets} />
  </div>

  <AdBanner className="md:mx-auto max-w-screen-xl" />
</main>
