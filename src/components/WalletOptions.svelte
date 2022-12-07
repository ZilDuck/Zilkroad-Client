<script lang="ts">
  import { goto } from '$app/navigation'
  import Token from '$components/Token.svelte'
  import ViewWallet from '$icons/ViewWallet.svelte'
  import DisconnectWallet from '$icons/DisconnectWallet.svelte'
  import Zil from '$icons/Zil.svelte'
  import wallet from '$store/wallet'
  import TokenSwap from '$components/TokenSwap.svelte'
  import TransactionList from '../lib/TransactionList/index.svelte'

  let showTokenSwap = false
  export let data = []

  function toggleTokenSWAP() {
    showTokenSwap = !showTokenSwap
  }

  function routeToPage(route: string, replaceState: boolean) {
    goto(`/${route}`, { replaceState })
  }

  function disconnectWallet() {
    wallet.disconnect()
    routeToPage('', true)
  }
</script>

<div
  class="wallet-options-container w-[392px] max-w-[100vw] bg-black p-5 rounded-lg flex flex-col absolute top-[calc(100%_+_40px)] right-0 border-[1px] border-zilkroad-gray-border z-50"
>
  <div class="wallet-options-header flex justify-between items-center border-b-[1px] border-zilkroad-gray-border pb-5">
    <h6 class="font-medium">Options</h6>
    <div class="wallet-options-header-user flex">
      <img
        src="https://i.pickadummy.com/index.php?imgsize=25x25&cache={$wallet.base16}"
        alt="Wallet avatar"
        class="mr-[10px] rounded-full "
      />
      <p>{data}</p>
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
  <div class="wallet-options-currencies pt-5 pb-8 border-b-[1px] border-zilkroad-gray-border grid grid-cols-2 gap-5">
    <Token tokenType="ZIL" valueUsd={$wallet.balances?.zil_usd_amount} value={$wallet.balances?.zil_amount} />
    <Token tokenType="wZIL" valueUsd={$wallet.balances?.wzil_usd_amount} value={$wallet.balances?.wzil_amount} />
    <Token tokenType="XSGD" valueUsd={$wallet.balances?.xsgd_usd_amount} value={$wallet.balances?.xsgd_amount} />
    <Token tokenType="zUSDT" valueUsd={$wallet.balances?.zusdt_usd_amount} value={$wallet.balances?.zusdt_amount} />
    <Token tokenType="zWBTC" valueUsd={$wallet.balances?.zwbtc_usd_amount} value={$wallet.balances?.zwbtc_amount} />
    <Token tokenType="zETH" valueUsd={$wallet.balances?.zeth_usd_amount} value={$wallet.balances?.zeth_amount} />
    <Token tokenType="GZIL" valueUsd={$wallet.balances?.gzil_usd_amount} value={$wallet.balances?.gzil_amount} />
    <Token tokenType="DUCK" valueUsd={$wallet.balances?.duck_usd_amount} value={$wallet.balances?.duck_amount} />
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
  <div class="pt-5">
    <TransactionList />
  </div>
</div>
