<script>
  import Wallet from './icons/Wallet.svelte'
  import wallet from '$store/wallet'
  import { navigating } from '$app/stores'
  import WalletOptions from '$components/WalletOptions.svelte'
  import { clickOutside } from '$lib/listeners.js'

  export let full = false
  export let noMargin = false

  let showWalletOptions = false
  $: truncatedWallet = $wallet.bech32 ? `${$wallet.bech32.slice(0, 6)}...${$wallet.bech32.slice(-6)}` : false

  function handleWallet() {
    if (!$wallet.isConnected) {
      wallet.connect()
    }

    // Toggles if the wallet options are visible or not.
    if ($wallet.isConnected) {
      showWalletOptions = !showWalletOptions
    }
  }

  function handleClickOutside() {
    // Handles clicking outside of the connect wallet button or wallet options
    if ($wallet.isConnected) {
      showWalletOptions = false
    }
  }

  if ($navigating) {
    showWalletOptions = false
  }
</script>

<div class="relative {full ? 'w-full' : ''}" use:clickOutside on:click_outside={handleClickOutside}>
  <button
    class="flex items-center justify-center h-12 bg-white rounded-lg text-zilkroad-gray-medium {noMargin
      ? ''
      : 'ml-5'} pl-5 pr-5 relative {full ? 'w-full' : ''}"
    on:click={handleWallet}
  >
    {truncatedWallet || 'Connect wallet'}
    <Wallet className="ml-[10px]" />
  </button>

  {#if showWalletOptions}
    <div>
      <WalletOptions />
    </div>
  {/if}
</div>
