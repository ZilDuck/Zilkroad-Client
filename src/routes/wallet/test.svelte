<script type="ts">
  import wallet from '$store/wallet'
  import marketplace from '$store/marketplace'
  import { unwrapZil, wrapZil } from '../../zilpay/wzil'
  import SideModal from "../../components/SideModal.svelte";
  import EditSidebar from "../../components/sidebars/EditSidebar.svelte";
  import { convertWithDecimals } from "../../lib/fungibles";


  // DEBUG
  let importEnv = JSON.stringify(import.meta.env, undefined, 2)
  // let processEnv = JSON.stringify(process.env, undefined, 2)

  // WZIL
  let fungibleAddress = '0x864895d52504c388A345eF6cd9C800DBBD0eF92A'

  // BUY
  let listingId = '0'
  let listingPrice = '0'

  // EDIT
  let editListingId = '0'
  let editListingFungibleAddress = ''
  let editListingFungibleAmount = '0'
  
  // LIST
  let nftContractAddress = ''
  let nftContractTokenID = ''
  let sellPrice = 0

  // DELIST
  let delistingId = '0'

  // CONVERT
  let convertAmount = 0
  let zilToWZil = true
  
  // SIDEBAR
  let sidebarOpen = false

  function buy() {
    console.log('buy triggered')
    console.log('Buying Listing: ' + listingId)
    console.log('For: ' + listingPrice)
    console.log('With: ' + fungibleAddress)
    try {
      let buyTransactions = marketplace.buyNft(fungibleAddress, listingPrice, listingId)
      console.log(buyTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  function edit() {
    console.log('edit triggered')
    console.log('Editing Listing: ' + editListingId)
    console.log('For: ' + editListingFungibleAmount)
    console.log('With: ' + editListingFungibleAddress)
    try {
      const convertedEditAmount = convertWithDecimals($marketplace.approvedFungibles, editListingFungibleAddress, editListingFungibleAmount)
      let editTransactions = marketplace.editListedNft(editListingId, editListingFungibleAddress, convertedEditAmount)
      console.log(editTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  function list() {
    console.log('buy triggered')
    console.log('Listing token: ' + nftContractTokenID)
    console.log('from collection: ' + nftContractAddress)
    console.log('For: ' + sellPrice)
    console.log('With: ' + fungibleAddress)
    try {
      let listTransactions = marketplace.listNft(nftContractAddress, nftContractTokenID, fungibleAddress, sellPrice)
      console.log(listTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  function delist() {
    console.log('delist triggered')
    console.log('Listing id: ' + delistingId)
    try {
      let delistTransactions = marketplace.delistNft(delistingId)
      console.log(delistTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  function convert() {
    console.log('convert triggered')
    console.log('Convert Amount: ' + convertAmount)
    console.log('Direction: ' + zilToWZil ? 'ZIL to WZIL' : 'WZIL to ZIL')
    try {
      let delistTransactions = zilToWZil ? wrapZil(convertAmount) : unwrapZil(convertAmount)
      console.log(delistTransactions)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  function openEditModal() {
    sidebarOpen = true
  }

  $: walletAvailable = $wallet.isConnected ? 'Connected!' : 'Not Found. Is Zilpay connected?'
</script>

<div class="w-fit mx-auto space-y-5">
  <h1>Wallet Testing</h1>
  <h2>Wallet connected? {walletAvailable}</h2>
  <hr />
  <div class="bg-gray-200 w-fit space-y-5 p-5">
    <h3 class="text-gray-700 font-bold">Buy Listing</h3>
    <div>
      <label for="listingID">Listing ID</label>
      <input id="listingID" bind:value={listingId} />
    </div>
    <div>
      <label for="listingPrice">Listing Price</label>
      <input id="listingPrice" bind:value={listingPrice} />
    </div>
    <div>
      <label for="fungibleAddress">WZIL ID</label>
      <input id="fungibleAddress" bind:value={fungibleAddress} />
    </div>

    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={buy}>CLICK TO BUY</p>
  </div>

  <div class="bg-gray-200 w-fit space-y-5 p-5">
    <h3 class="text-gray-700 font-bold">Edit Listing</h3>
    <div>
      <label for="listingID">Listing ID</label>
      <input id="editListingID" bind:value={editListingId} />
    </div>
    <div>
      <label for="listingPrice">Listing Price</label>
      <input id="editListingPrice" bind:value={editListingFungibleAmount} />
    </div>
    <div>
      <label for="fungibleAddress">Fungible Address</label>
      <input id="editFungibleAddress" bind:value={editListingFungibleAddress} />
    </div>

    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={edit}>CLICK TO EDIT</p>
    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={openEditModal}>CLICK TO OPEN EDIT SIDEBAR</p>
  </div>

  <div class="bg-gray-200 w-fit space-y-5 p-5">
    <h3 class="text-gray-700 font-bold">Add Listing</h3>
    <div>
      <label for="nftContractAddress">Contract Address</label>
      <input id="nftContractAddress" bind:value={nftContractAddress} />
    </div>
    <div>
      <label for="nftContactTokenID">Nft Token ID</label>
      <input id="nftContactTokenID" bind:value={nftContractTokenID} />
    </div>
    <div>
      <label for="listFungibleAddress">WZIL ID</label>
      <input id="listFungibleAddress" bind:value={fungibleAddress} />
    </div>
    <div>
      <label for="sellPrice">Sell Price</label>
      <input id="sellPrice" bind:value={sellPrice} />
    </div>

    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={list}>CLICK TO LIST</p>
  </div>

  <div class="bg-gray-200 w-fit space-y-5 p-5">
    <h3 class="text-gray-700 font-bold">Remove Listing</h3>
    <div>
      <label for="delistingId">Order ID</label>
      <input id="delistingId" bind:value={delistingId} />
    </div>

    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={delist}>CLICK TO DELIST</p>
  </div>

  <div class="bg-gray-200 w-fit space-y-5 p-5">
    <h3 class="text-gray-700 font-bold">Convert ZIL WZIL</h3>
    <div>
      <label for="zilAmount">ZIL Amount</label>
      <input id="zilAmount" disabled={!zilToWZil} bind:value={convertAmount} />
    </div>
    <div>
      <label for="wZilAmount">WZIL Amount</label>
      <input id="wZilAmount" disabled={zilToWZil} bind:value={convertAmount} />
    </div>
    <div>
      <input type="checkbox" id="convertDirection" bind:checked={zilToWZil} />
      <label for="convertDirection">Conversion switch: {zilToWZil ? 'ZIL to WZIL' : 'WZIL to ZIL'}</label>
    </div>

    <p class="border-blue-400 border-2 text-gray-700 font-bold" on:click={convert}>
      CLICK TO {zilToWZil ? 'Change ZIL to WZIL' : ' Change WZIL to ZIL'}
    </p>
  </div>

  <h3>Process Env</h3>
  <pre class="bg-gray-400 text-white">
    <!--{processEnv}-->
  </pre>

  <h3>Import Env</h3>
  <pre class="bg-gray-400 text-white">
    {importEnv}
  </pre>
</div>
<SideModal bind:show={sidebarOpen} title="Edit">
  <EditSidebar bind:sellPrice={editListingFungibleAmount} bind:sellFungible={editListingFungibleAddress} bind:listingId={editListingId} {edit}/>
</SideModal>
