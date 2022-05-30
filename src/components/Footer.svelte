<script>
  import CoolLine from './CoolLine.svelte'
  import Discord from './icons/Discord.svelte'
  import Telegram from './icons/Telegram.svelte'
  import Twitter from './icons/Twitter.svelte'
  export let className = 'mt-28'
</script>

<CoolLine top={true} bottom={true} {className}>
  <footer class="py-20 ml-10 grid max-w-screen-xl md:mx-auto md:grid-cols-4">
    <div>
      <h2>Zilkroad</h2>
      <ul>
        <li><a href={'/'}>Marketplace</a></li>
        <li><a href={'/'}>Collections</a></li>
        <li><a href={'/'}>Wallet activity</a></li>
        <li><a href={'/'}>Launchpad</a></li>
        <li><a href={'/'}>Docs</a></li>
      </ul>
    </div>
    <div>
      <h2>Company</h2>
      <ul>
        <li><a href={'/'}>About us</a></li>
      </ul>
    </div>
    <div>
      <h2>Other</h2>
      <ul>
        <li><a href={'/'}>Privacy policy</a></li>
        <li><a href={'/'}>Terms and conditions</a></li>
        <li><a href={'/'}>Cookie policy</a></li>
        <li><a href={'/'}>Business info</a></li>
      </ul>
    </div>
    <div>
      <h2>Social</h2>
      <ul class="flex flex-row space-x-5 !space-y-0">
        <li><Discord /></li>
        <li><Twitter /></li>
        <li><Telegram /></li>
      </ul>
    </div>
  </footer>
</CoolLine>

<p class="py-10 ml-10 max-w-screen-xl md:mx-auto">© 2021 Zilkroad</p>

<style lang="postcss">
  footer > div:first-of-type {
    @apply mt-0;
  }
  footer > div {
    @apply mt-10 md:mt-0;
  }
  footer > div > h2 {
    @apply font-medium;
  }
  ul > li > a {
    @apply font-light text-zilkroad-gray-light;
  }

  ul {
    @apply space-y-5 pt-5;
  }
</style>
