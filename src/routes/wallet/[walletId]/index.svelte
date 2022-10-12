<script context="module">
  import { isBech32, toBech32Address, isAddress } from '../../../zilpay/util'

  export async function load({ params, fetch }) {
    const { walletId } = params

    //404 invalid addresses
    if (isAddress(walletId) === false && isBech32(walletId) === false) {
      return {
        status: 404,
        error: new Error(`Not Found`)
      }
    }

    //Redirect base16 (0x) addresses
    if (isBech32(walletId) === false) {
      return {
        status: 302,
        redirect: toBech32Address(walletId)
      }
    }

    const [walletMeta, listedNfts, ownedNfts] = await Promise.all([
      fetch(`/wallet/${walletId}.json`)
        .then((r) => r.json())
        .catch((error) => console.log(error)),
      fetch(`/wallet/${walletId}/listedNfts.json`)
        .then((r) => r.json())
        .catch((error) => console.log(error)),
      fetch(`/wallet/${walletId}/nfts.json`)
        .then((r) => r.json())
        .catch((error) => console.log(error))
    ])

    return {
      props: {
        walletMeta,
        zkListedNfts: listedNfts?.nfts,
        zkListedNftsPagination: listedNfts?.pagination,
        nfts: ownedNfts?.nfts,
        pagination: ownedNfts?.pagination
      }
    }
  }
</script>

<script>
  import ScrollableSection from '$components/ScrollableSection.svelte'
  import Pagination from '$components/Pagination.svelte'
  import UserActivityTable from '../../../lib/UserActivityTable/index.svelte'
  import wallet from '$store/wallet'
  import Detail from '$components/Detail.svelte'
  import NftCardList from '../../../lib/NftCardList/index.svelte'
  import Zil from '$icons/Zil.svelte'
  import SideModal from '$components/SideModal.svelte'
  import { page } from '$app/stores'
  import ShapeImage from '$components/ShapeImage.svelte'

  let currentOwnedPage = 1
  let currentListingsPage = 1

  export let walletMeta
  export let nfts
  export let zkListedNfts
  export let pagination
  export let zkListedNftsPagination
  export let walletId = walletMeta.user_address_b32 ?? '...'

  export let ownedNfts = nfts ?? []
  export let listedNfts = zkListedNfts ?? []

  export let nftCount = walletMeta.nfts?.total ?? 0
  export let listedNftCount = walletMeta.user_stats?.listing_count ?? 0
  export let totalPurchases = walletMeta.user_stats?.bought_count ?? 0
  export let totalSales = walletMeta.user_stats?.sold_count ?? 0
  export let totalRoyalties = walletMeta.user_stats?.royaltys_in_count ?? 0
  export let royalties = walletMeta.user_stats?.sum_royalty_usd ?? 0
  export let walletActivity = walletMeta.wallet_activity ?? []

  $: isOwnedByConnectedWallet = $wallet.bech32 === walletId
  $: pronoun = isOwnedByConnectedWallet ? `Your` : `Wallet's`

  let showModal = false

  function toggleModal() {
    showModal = !showModal
  }

  export let currentPage = $page.url.searchParams.get('page') ?? 1

  async function handleOwnedPageChange(event) {
    const page = event.detail.currentPage
    let walletNfts = await fetch(`/wallet/${walletId}/nfts.json?page=${page}`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    ownedNfts = walletNfts.nfts ?? []
    currentPage = page
  }

  async function handleListedPageChange(event) {
    const page = event.detail.currentPage
    let walletListedNfts = await fetch(`/wallet/${walletId}/listedNfts.json?page=${page}`)
      .catch((error) => {
        console.log(error)
      })
      .then((r) => r.json())
    listedNfts = walletListedNfts.nfts ?? []
    currentPage = page
  }
</script>

<ShapeImage />

<main class="space-y-32 mx-5">
  <div class="flex flex-col max-w-screen-xl mx-auto text-white mt-10 md:mt-40 mb-[120px]">
    <div class="max-w-[100%] w-full md:w-auto p-5 bg-zilkroad-gray-dark rounded-md self-start">
      <h1 class="flex text-4xl font-semibold h-14 border-b-[1px] border-zilkroad-gray-border">
        <span class="md:hidden">Your wallet</span>
        <a href={`https://viewblock.io/zilliqa/address/${walletId}`}>
          <span class="hidden md:!block max-w-s overflow-hidden text-ellipsis">{walletId}</span>
        </a>
      </h1>
      <div class="flex flex-col md:flex-row md:space-x-5 md:pt-5">
        <Detail description="Total NFTs" value={nftCount} border="right" columnMobile={true} />
        <Detail description="NFTs Listed" value={listedNftCount} border="right" columnMobile={true} />
        <Detail description="Total Purchases" value={totalPurchases} border="right" columnMobile={true} />
        <Detail description="Total Sales" value={totalSales} border="right" columnMobile={true} />
        <Detail description="Number of royalties" value={totalRoyalties} border="right" columnMobile={true} />
        <Detail description="Royalty Revenue" value="${royalties}" border="right" columnMobile={true} />
      </div>
    </div>
  </div>

  <!-- <button on:click={toggleModal}>Toggle</button> -->
  <SideModal bind:show={showModal}>
    <h4 class="text-[20px] font-[600] mb-5">Item name</h4>
    <p class="mb-5 text-zilkroad-text-normal">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
    </p>
    <img src="/images/nft-image.png" alt="NFT image you're selling" class="w-full pb-5" />
    <div class="text-white h-16 flex items-center bg-zilkroad-gray-dark p-5 mb-5 rounded-lg w-full">
      <input type="text" placeholder="0" />
      <Zil /><span class="ml-5">Convert Zil</span>
    </div>
    <p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
      Royalties<span class="text-white">122.00 XSGD - 10%</span>
    </p>
    <p class="flex justify-between items-center w-full text-[20px] text-zilkroad-text-normal mb-5">
      Total after royalties<span class="text-white">1098.00 XSGD</span>
    </p>
    <p class="mb-10 text-zilkroad-text-normal">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem elementum lorem felis tincidunt.
    </p>
    <button class="text-white h-12 flex justify-center items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full mb-5"
      >Cancel</button
    >
    <button class="text-zilkroad-text-light h-12 flex justify-center items-center bg-white p-5 rounded-lg w-full"
      >Submit</button
    >
  </SideModal>

  {#if listedNfts.length !== 0}
    <div class="flex flex-col max-w-screen-xl mx-auto">
      <h2 class="text-2xl font-medium">{pronoun} listed NFTs</h2>
      <div class="mt-10">
        <NftCardList nfts={listedNfts} />
      </div>
      {#if listedNfts.length > 0}
        <Pagination
          bind:currentPage={zkListedNftsPagination.page}
          numPages={zkListedNftsPagination?.total_pages}
          className="mx-auto"
          on:pageChange={handleListedPageChange}
        />
      {/if}
    </div>
  {/if}

  <div class="flex flex-col max-w-screen-xl mx-auto space-y-10 text-white">
    <h2 class="text-2xl font-medium">{pronoun} NFTs</h2>
    <NftCardList nfts={ownedNfts} />
    {#if listedNfts.length > 0}
      <Pagination
        bind:currentPage={pagination.page}
        numPages={pagination?.total_pages}
        className="mx-auto"
        on:pageChange={handleOwnedPageChange}
      />
    {/if}
  </div>

  <div class="">
    <UserActivityTable bind:data={walletActivity} />
  </div>
</main>
