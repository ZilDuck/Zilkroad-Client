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

  export let title = 'Wallet Activity'
  export let description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt. Semper urna, cursus sed congue fringilla gravida velit egestas nascetur.'
  export let buyerWallets = []
  export let sellerWallets = []
  export let royaltyWallets = []
  export let currencies = [
    {
      name: 'XSGD',
      rate: 0.2
    },
    {
      name: 'zWBTC',
      rate: 2.2
    },
    {
      name: 'WZIL',
      rate: 1340.2
    },
    {
      name: 'zWUSDT',
      rate: 1.0
    },
    {
      name: 'zWETH',
      rate: 0.23333
    },
    {
      name: 'GZIL',
      rate: 202.2
    }
  ]
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
    <WalletActivityCardList wallets={royaltyWallets} {currencies} />
  </div>

  <div class="mx-auto max-w-screen-xl">
    <div class="flex">
      <h2 class="flex-1">Top seller wallets</h2>
      <a href="/wallet-activity/sellers">View all sellers</a>
    </div>
    <WalletActivityCardList wallets={sellerWallets} {currencies} />
  </div>

  <div class="mx-auto max-w-screen-xl">
    <div class="flex">
      <h2 class="flex-1">Top buyer wallets</h2>
      <a href="/wallet-activity/buyers">View all buyers</a>
    </div> 
    <WalletActivityCardList wallets={buyerWallets} {currencies} />
  </div>
</main>
