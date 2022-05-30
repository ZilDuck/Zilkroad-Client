<script>
  import Wallet from './icons/Wallet.svelte'
  import wallet from '$store/wallet'
  import { goto } from '$app/navigation'
  import WalletOptions from '$components/WalletOptions.svelte'
  import { clickOutside } from '$lib/listeners.js'

  let showWalletOptions = false
  $: truncatedWallet = $wallet.bech32 ? `${$wallet.bech32.slice(0, 6)}...${$wallet.bech32.slice(-6)}` : false

  function handleWallet() {
    wallet.connect()

    // Toggles if the wallet options are visible or not.
    if ($wallet.isConnected) {
      showWalletOptions = !showWalletOptions
    }
  }

  function handleOutsideWalletClick(event) {
    showWalletOptions = false
  }
</script>

<div class="relative">
  <button
    class="flex items-center justify-center h-12 bg-white rounded-lg text-zilkroad-gray-dark pl-[20px] pr-[20px] ml-5 relative"
    on:click={handleWallet}
  >
    {truncatedWallet || 'Connect wallet'}
    <Wallet className="ml-[20px]" />
  </button>

  {#if $wallet.isConnected && showWalletOptions}
    <div use:clickOutside on:click_outside={handleOutsideWalletClick}>
      <WalletOptions />
    </div>
  {/if}
</div>
