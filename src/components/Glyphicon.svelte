<script lang="ts">
import { jazzicon } from "@metamask/jazzicon";

  export let address = '0x973536b9f458f17eEff11796927d92A29e23Ca58'
  export let className = ''
  export let textColor = 'text-zilkroad-gray-medium'
  export let dark = false
  let rendered_jazzicon = jazzicon(30, parseInt(address.slice(2, 10), 16))
</script>

<p>{rendered_jazzicon}</p>