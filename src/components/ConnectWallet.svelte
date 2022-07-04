<script>
  import Wallet from './icons/Wallet.svelte'
  import wallet from '$store/wallet'
  import { navigating } from '$app/stores'
  import WalletOptions from '$components/WalletOptions.svelte'
  import { clickOutside } from '$lib/listeners.js'

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

<div class="relative" use:clickOutside on:click_outside={handleClickOutside}>
  <button
    class="flex items-center justify-center h-12 bg-white rounded-lg text-zilkroad-gray-medium pl-[20px] pr-[20px] ml-5 relative"
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
