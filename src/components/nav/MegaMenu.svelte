<script lang="ts">
  import { fade } from 'svelte/transition'
  import WalletActivity from '$icons/WalletActivity.svelte'
  import Launchpad from '$icons/Launchpad.svelte'
  import Collections from '$icons/Collections.svelte'
  import Docs from '$icons/Docs.svelte'
  import variables from "../../store/variables";
</script>

<div
  transition:fade={{ duration: 200 }}
  class="absolute top-full left-0 px-5 w-full py-10 bg-black min-h-[200px] border-t border-b border-solid border-t-zilkroad-gray-dark border-b-zilkroad-gray-dark z-10"
>
  <div class="flex items-start w-full max-w-screen-xl mx-auto">
    <div class="grid grid-cols-2 grid-flow-row col-gap gap-5">
      <a
        href="/collections"
        class="w-[224px] p-5 border border-solid border-zilkroad-gray-dark rounded-lg hover:bg-zilkroad-gray-dark"
      >
        <div class="flex items-center mb-3">
          <Collections /><span class="ml-2">Collections</span>
        </div>
        <p class="text-[14px] leading-[1.5]">View all of the NFT collections on Zilkroad.</p>
      </a>

      <a
        href="/wallet-activity"
        class="w-[224px] p-5 border border-solid border-zilkroad-gray-dark rounded-lg hover:bg-zilkroad-gray-dark"
      >
        <div class="flex items-center mb-3">
          <WalletActivity /><span class="ml-2">Wallet activity</span>
        </div>
        <p class="text-[14px] leading-[1.5]">Track wallet activity for buyers, sellers and royalty recipients.</p>
      </a>

      <!-- <a
        href="/launchpad"
        class="w-[224px] p-5 border border-solid border-zilkroad-gray-dark rounded-lg hover:bg-zilkroad-gray-dark"
      >
        <div class="flex items-center mb-3">
          <Launchpad /><span class="ml-2">Launchpad</span>
        </div>
        <p class="text-[14px] leading-[1.5]">
          See all the new projects minting on Zilkroad.
        </p>
      </a> -->

      <a
        href={$variables.docsUrl}
        class="w-[224px] p-5 border border-solid border-zilkroad-gray-dark rounded-lg hover:bg-zilkroad-gray-dark"
      >
        <div class="flex items-center mb-3">
          <Docs /><span class="ml-2">Docs</span>
        </div>
        <p class="text-[14px] leading-[1.5]">Learn more about the Zilkroad platform.</p>
      </a>
    </div>

    <div
      class="rounded-lg min-h-[256px] w-full bg-[url('/images/cta-background.jpg')] bg-cover flex flex-col flex-1 ml-5 p-10"
    >
      <h3 class="text-white text-2xl mb-5">Feature your collection</h3>
      <p class="text-white w-full mb-5">
        Make your collection stand out by becoming a featured collection on Zilkroad. You will get featured banners, the
        featured tick and more by featuring your collection.
      </p>
      <a
        href={$variables.docsUrl}
        class="bg-white text-[#989898] px-5 rounded-xl h-12 inline-flex items-center self-start"
        >Feature your collection</a
      >
    </div>
  </div>
</div>
