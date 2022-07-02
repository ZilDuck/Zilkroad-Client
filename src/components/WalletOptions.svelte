<script lang="ts">
  import Token from '$components/Token.svelte'
  import ViewWallet from '$icons/ViewWallet.svelte'
  import DisconnectWallet from '$icons/DisconnectWallet.svelte'
  import Zil from '$icons/Zil.svelte'
  import wallet from '$store/wallet'
  import TokenSwap from '$components/TokenSwap.svelte'

  let showTokenSwap = false

  function toggleTokenSWAP() {
    showTokenSwap = !showTokenSwap
  }

  function disconnectWallet() {
    wallet.disconnect()
  }
</script>

<div
  class="wallet-options-container w-[392px] max-w-[100vw] bg-black p-5 rounded-lg flex flex-col absolute top-[calc(100%_+_40px)] right-0 border-[1px] border-zilkroad-gray-border z-50"
>
  <div class="wallet-options-header flex justify-between items-center border-b-[1px] border-zilkroad-gray-border pb-5">
    <h6 class="font-medium">Options</h6>
    <div class="wallet-options-header-user flex">
      <img src="/images/user-avatar.png" alt="Wallet avatar" class="mr-[10px]" />
      <p>zil16wg79q...</p>
    </div>
  </div>
  <div class="wallet-options-menu py-5 border-b-[1px] border-zilkroad-gray-border">
    <ul>
      <li class="mb-[10px] last:mb-0">
        <a href="/wallet/{$wallet.bech32}" class="flex items-center text-white">
          <ViewWallet />
          <span class="ml-[10px]">View wallet</span></a
        >
      </li>
      <li class="mb-[10px] last:mb-0">
        <button on:click={disconnectWallet} class="flex items-center text-white">
          <DisconnectWallet />
          <span class="ml-[10px]">Disconnect wallet</span></button
        >
      </li>
    </ul>
  </div>
  <div class="wallet-options-currencies py-5 border-b-[1px] border-zilkroad-gray-border grid grid-cols-2 gap-5">
    <Token tokenType="XSGD" value={1200} />
    <Token tokenType="zWUSDT" value={0} />
    <Token tokenType="zWBTC"  />
    <Token tokenType="zWETH" value={$wallet.balances.zweth} />
    <Token tokenType="WZIL" value={$wallet.balances.wzil} />
    <Token tokenType="GZIL" value={$wallet.balances.gzil} />
  </div>
  <div class="wallet-options-convert-button pt-5">
    {#if showTokenSwap}
      <TokenSwap />
      <button class="text-white h-16 flex items-center p-5 w-full underline justify-center" on:click={toggleTokenSWAP}
        >Cancel swap</button
      >
    {/if}
    {#if !showTokenSwap}
      <button
        class="text-white h-16 flex items-center bg-zilkroad-gray-dark p-5 rounded-lg w-full"
        on:click={toggleTokenSWAP}><Zil /><span class="ml-5">Convert Zil</span></button
      >
    {/if}
  </div>
</div>
