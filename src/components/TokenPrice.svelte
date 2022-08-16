<script>
  import { convertWithDecimals } from "../lib/fungibles";
  import marketplace from "$store/marketplace";

  export let fungibleAddressOrSymbol = ''
  export let price = 0
  export let reverse = false
  
</script>

{convertWithDecimals($marketplace.approvedFungibles, fungibleAddressOrSymbol, price, reverse)}